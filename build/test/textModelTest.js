"use strict";
const model_1 = require("../model");
const assert = require("assert");
const testText1 = `# Title

paragraph 1
something else

- first line
- second line
- third line`;
const multilinesText = `multilinesText
total 3 lines
last line.`;
describe("TextModel", () => {
    let testLines1 = testText1.split("\n");
    assert.equal(testLines1.length, 8);
    describe("#Intialize", () => {
        let tm1 = new model_1.TextModel(testText1);
        assert(tm1.linesCount === 8);
        tm1.forEach((line) => {
            let lineText = testLines1[line.number - 1];
            if (line.number != tm1.linesCount)
                lineText += "\n";
            assert(lineText == line.text, "The line " + line.number + '"' + lineText + '" should equal to ' +
                '"' + line.text + '"');
            ;
        });
    });
    describe("Testing Position & CharAt API", () => {
        let tm1 = new model_1.TextModel(testText1);
        for (let i = 0; i < testText1.length; i++) {
            assert.equal(tm1.charAt(tm1.positionAt(i)), testText1.charAt(i));
            assert.equal(tm1.offsetAt(tm1.positionAt(i)), i);
        }
    });
    describe("#Report", () => {
        let tm1 = new model_1.TextModel(testText1);
        let reportText = tm1.reportAll();
        assert(testText1 == reportText, "Report all should equal to the source");
        let firstLine = tm1.report({
            begin: {
                line: 1,
                offset: 0,
            },
            end: {
                line: 1,
                offset: 7,
            },
        });
        assert(tm1.lineAt(1).text == firstLine + '\n');
        let thatLines = tm1.report({
            begin: {
                line: 1,
                offset: 0,
            },
            end: {
                line: 3,
                offset: 1,
            }
        });
        assert("# Title\n\np");
    });
    describe("#Insert", () => {
        function insertTextToModel(model, pos, text) {
            model.applyTextEdit(new model_1.TextEdit(model_1.TextEditType.InsertText, pos, text));
        }
        let tm1 = new model_1.TextModel(testText1);
        insertTextToModel(tm1, { line: 1, offset: 0 }, "(insert)");
        assert(tm1.lineAt(1).text == "(insert)# Title\n");
        insertTextToModel(tm1, { line: 1, offset: 15 }, "(insert)");
        assert(tm1.lineAt(1).text == "(insert)# Title(insert)\n");
        tm1 = new model_1.TextModel(testText1);
        assert.throws(() => {
            insertTextToModel(tm1, { line: 0, offset: 0 }, "(insert)");
        }, Error);
        assert.throws(() => {
            insertTextToModel(tm1, { line: tm1.linesCount + 1, offset: 0 }, "insert");
        }, Error);
        assert.throws(() => {
            insertTextToModel(tm1, { line: 0, offset: tm1.lineAt(1).length }, "insert");
        }, Error);
        tm1 = new model_1.TextModel(testText1);
        insertTextToModel(tm1, { line: 4, offset: 9 }, "\n");
        assert(tm1.linesCount === 9);
        assert(tm1.lineAt(4).text == "something\n");
        assert(tm1.lineAt(5).text == " else\n");
        assert(tm1.lineAt(6).text == "\n");
        assert(tm1.lineAt(7).text == "- first line\n");
        assert(tm1.lineAt(8).text == "- second line\n");
        assert(tm1.lineAt(9).text == "- third line");
        tm1 = new model_1.TextModel(testText1);
        insertTextToModel(tm1, { line: 4, offset: 9 }, multilinesText);
        assert(tm1.linesCount === 10);
        assert(tm1.lineAt(4).text == "somethingmultilinesText\n");
        assert(tm1.lineAt(5).text == "total 3 lines\n");
        assert(tm1.lineAt(6).text == "last line. else\n");
        tm1 = new model_1.TextModel(testText1);
        insertTextToModel(tm1, tm1.positionAt(testText1.length - 1), "(insert)");
        assert(/(insert)/.test(tm1.lineAt(tm1.linesCount).text));
    });
    describe("#Delete1", () => {
        function deleteText(model, range) {
            model.applyTextEdit(new model_1.TextEdit(model_1.TextEditType.DeleteText, range));
        }
        let tm1 = new model_1.TextModel(testText1);
        deleteText(tm1, {
            begin: { line: 4, offset: 4 },
            end: { line: 4, offset: 9 }
        });
        assert(tm1.lineAt(4).text == "some else\n");
    });
    describe("#Delete2", () => {
        function deleteText(model, range) {
            model.applyTextEdit(new model_1.TextEdit(model_1.TextEditType.DeleteText, range));
        }
        let tm1 = new model_1.TextModel(testText1);
        deleteText(tm1, {
            begin: { line: 1, offset: 1 },
            end: { line: 4, offset: 4 }
        });
        assert(tm1.lineAt(1).text == "#thing else\n", tm1.lineAt(1).text);
        assert(tm1.lineAt(2).text == "\n", tm1.lineAt(2).text);
        assert(tm1.lineAt(3).text == "- first line\n", tm1.lineAt(3).text);
    });
    describe("#Cancel", () => {
        console.log("cancellable insert");
        let tm1 = new model_1.TextModel(testText1);
        let result = tm1.applyCancellableTextEdit(new model_1.TextEdit(model_1.TextEditType.InsertText, { line: 1, offset: 0 }, "(insert)"));
        assert.equal(tm1.lineAt(1).text, "(insert)# Title\n");
        assert.strictEqual(result.reverse.type, model_1.TextEditType.DeleteText, "reverse type error");
        assert(model_1.PositionUtil.equalPostion(result.reverse.range.begin, { line: 1, offset: 0 }), "reverse range begin");
        assert(model_1.PositionUtil.equalPostion(result.reverse.range.end, result.pos), "reverse range end.");
        tm1.applyTextEdit(result.reverse);
        assert.equal(tm1.lineAt(1).text, "# Title\n", "reverse result error");
        console.log("cancellable multi-lines insert");
        tm1 = new model_1.TextModel(testText1);
        let inputText = "(insert)\n(secondline)";
        result = tm1.applyCancellableTextEdit(new model_1.TextEdit(model_1.TextEditType.InsertText, {
            line: 1, offset: 0,
        }, inputText));
        assert.equal(tm1.lineAt(1).text, "(insert)\n");
        assert.equal(tm1.lineAt(2).text, "(secondline)# Title\n");
        assert.strictEqual(result.reverse.type, model_1.TextEditType.DeleteText, "reverse type error");
        tm1.applyTextEdit(result.reverse);
        assert.equal(tm1.lineAt(1).text, "# Title\n", "reverse result#1 error");
        assert.equal(tm1.lineAt(2).text, "\n", "reverse result#2 error");
    });
    describe("#Cancel2", () => {
        console.log("cancellable delete API...");
        let tm1 = new model_1.TextModel(testText1);
        let result = tm1.applyCancellableTextEdit(new model_1.TextEdit(model_1.TextEditType.DeleteText, {
            begin: { line: 1, offset: 2 },
            end: { line: 1, offset: 3 },
        }));
        assert.strictEqual(result.reverse.type, model_1.TextEditType.InsertText, "reverse type error");
        assert.equal(tm1.lineAt(1).text, "# itle\n");
        tm1.applyTextEdit(result.reverse);
        assert.equal(tm1.lineAt(1).text, "# Title\n", "reverse result#1 error.");
        console.log("cancellable delete multi-lines API...");
        tm1 = new model_1.TextModel(testText1);
        result = tm1.applyCancellableTextEdit(new model_1.TextEdit(model_1.TextEditType.DeleteText, {
            begin: { line: 1, offset: 2 },
            end: { line: 3, offset: 1 },
        }));
        assert.equal(tm1.lineAt(1).text, "# aragraph 1\n", "delete result error");
        assert.equal(tm1.lineAt(2).text, "something else\n");
        tm1.applyTextEdit(result.reverse);
        assert.equal(tm1.lineAt(1).text, "# Title\n", "reverse result#1 error.");
        assert.equal(tm1.lineAt(2).text, "\n", "reverse result#2 error.");
        assert.equal(tm1.lineAt(3).text, "paragraph 1\n", "reverse result#3 error.");
    });
    describe("#CancellableReplace", () => {
        let tm1 = new model_1.TextModel(testText1);
        let result = tm1.applyCancellableTextEdit(new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
            begin: { line: 3, offset: 0 },
            end: { line: 4, offset: 1 }
        }, "(replace)"));
        assert.strictEqual(result.reverse.type, model_1.TextEditType.ReplaceText, "replace API");
        assert.equal(tm1.lineAt(3).text, "(replace)omething else\n", "indeed replace error");
        tm1.applyTextEdit(result.reverse);
        assert.equal(tm1.lineAt(3).text, "paragraph 1\n");
        assert.equal(tm1.lineAt(4).text, "something else\n");
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0L3RleHRNb2RlbFRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUEwRixVQUMxRixDQUFDLENBRG1HO0FBQ3BHLE1BQU8sTUFBTSxXQUFXLFFBQVEsQ0FBQyxDQUFDO0FBR2xDLE1BQU0sU0FBUyxHQUNmOzs7Ozs7O2FBT2EsQ0FBQTtBQUViLE1BQU0sY0FBYyxHQUNwQjs7V0FFVyxDQUFBO0FBRVgsUUFBUSxDQUFDLFdBQVcsRUFBRTtJQUVsQixJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVuQyxRQUFRLENBQUMsWUFBWSxFQUFFO1FBQ25CLElBQUksR0FBRyxHQUFHLElBQUksaUJBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUU3QixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBZTtZQUN4QixJQUFJLFFBQVEsR0FBWSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVwRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUM7Z0JBQzlCLFFBQVEsSUFBSSxJQUFJLENBQUM7WUFDckIsTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUN4QixXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsUUFBUSxHQUFHLG9CQUFvQjtnQkFDakUsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFBQSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUE7SUFFRixRQUFRLENBQUMsK0JB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LFVBQVUsQ0FBQyxDQUFDO1FBQzdELENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVWLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDVixpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVWLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDVixpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUdWLEdBQUcsR0FBRyxJQUFJLGlCQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0IsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLGFBQWEsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLGdCQUFnQixDQUFDLENBQUM7UUFDL0Ms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
