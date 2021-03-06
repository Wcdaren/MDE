"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const { Menu, MenuItem } = electron_1.remote;
const events_1 = require("events");
const util_1 = require("../util");
var MenuButtonType;
(function (MenuButtonType) {
    MenuButtonType[MenuButtonType["NewFile"] = 0] = "NewFile";
    MenuButtonType[MenuButtonType["OpenFile"] = 1] = "OpenFile";
    MenuButtonType[MenuButtonType["Save"] = 2] = "Save";
    MenuButtonType[MenuButtonType["SaveAs"] = 3] = "SaveAs";
    MenuButtonType[MenuButtonType["Preference"] = 4] = "Preference";
    MenuButtonType[MenuButtonType["ExportHTML"] = 5] = "ExportHTML";
    MenuButtonType[MenuButtonType["Exit"] = 6] = "Exit";
    MenuButtonType[MenuButtonType["Undo"] = 7] = "Undo";
    MenuButtonType[MenuButtonType["Redo"] = 8] = "Redo";
    MenuButtonType[MenuButtonType["Cut"] = 9] = "Cut";
    MenuButtonType[MenuButtonType["Copy"] = 10] = "Copy";
    MenuButtonType[MenuButtonType["Paste"] = 11] = "Paste";
    MenuButtonType[MenuButtonType["SelectAll"] = 12] = "SelectAll";
    MenuButtonType[MenuButtonType["Search"] = 13] = "Search";
    MenuButtonType[MenuButtonType["Replace"] = 14] = "Replace";
    MenuButtonType[MenuButtonType["OpenDevTools"] = 15] = "OpenDevTools";
    MenuButtonType[MenuButtonType["Reload"] = 16] = "Reload";
    MenuButtonType[MenuButtonType["Documentation"] = 17] = "Documentation";
    MenuButtonType[MenuButtonType["About"] = 18] = "About";
    MenuButtonType[MenuButtonType["WhiteTheme"] = 19] = "WhiteTheme";
    MenuButtonType[MenuButtonType["BlackTheme"] = 20] = "BlackTheme";
})(MenuButtonType = exports.MenuButtonType || (exports.MenuButtonType = {}));
class MenuClickEvent extends Event {
    constructor(buttonType) {
        super("menuClick");
        this._type = buttonType;
    }
    get buttonType() {
        return this._type;
    }
}
exports.MenuClickEvent = MenuClickEvent;
class MainMenuView extends events_1.EventEmitter {
    constructor() {
        super();
        this.buildMenu();
    }
    buildMenu() {
        let options = [
            {
                label: util_1.i18n.getString("file"),
                submenu: [
                    {
                        label: util_1.i18n.getString("file.newFile"),
                        accelerator: "Ctrl+N",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.NewFile); }
                    },
                    {
                        type: "separator",
                    },
                    {
                        label: util_1.i18n.getString("file.open"),
                        accelerator: "Ctrl+O",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.OpenFile); }
                    },
                    {
                        label: util_1.i18n.getString("file.save"),
                        accelerator: "Ctrl+S",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Save); }
                    },
                    {
                        label: util_1.i18n.getString("file.saveAs"),
                        accelerator: "Ctrl+Shift+S",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.SaveAs); }
                    },
                    {
                        label: util_1.i18n.getString("file.preference"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Preference); }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: util_1.i18n.getString("file.export"),
                        submenu: [
                            {
                                label: util_1.i18n.getString("file.export.HTML"),
                                click: () => { this.emitMenuClickEvent(MenuButtonType.ExportHTML); }
                            }
                        ]
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: util_1.i18n.getString("file.exit"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Exit); }
                    }
                ]
            },
            {
                label: util_1.i18n.getString("edit"),
                submenu: [
                    {
                        label: util_1.i18n.getString("edit.undo"),
                        accelerator: "Ctrl+Z",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Undo); }
                    },
                    {
                        label: util_1.i18n.getString("edit.redo"),
                        accelerator: "Ctrl+Shift+Z",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Redo); }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: util_1.i18n.getString("edit.cut"),
                        accelerator: "Ctrl+X",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Cut); }
                    },
                    {
                        label: util_1.i18n.getString("edit.copy"),
                        accelerator: "Ctrl+C",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Copy); }
                    },
                    {
                        label: util_1.i18n.getString("edit.paste"),
                        accelerator: "Ctrl+V",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Paste); }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: util_1.i18n.getString("edit.search"),
                        accelerator: "Ctrl+F",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Search); }
                    },
                    {
                        label: util_1.i18n.getString("edit.replace"),
                        accelerator: "Ctrl+Shift+F",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Replace); }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: util_1.i18n.getString("edit.selectAll"),
                        accelerator: "Ctrl+A",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.SelectAll); }
                    },
                ]
            },
            {
                label: util_1.i18n.getString("view"),
                submenu: [
                    {
                        label: util_1.i18n.getString("view.whiteTheme"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.WhiteTheme); },
                    },
                    {
                        label: util_1.i18n.getString("view.blackTheme"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.BlackTheme); }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: util_1.i18n.getString("view.openDevTools"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.OpenDevTools); }
                    },
                    {
                        label: util_1.i18n.getString("view.reload"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Reload); }
                    }
                ]
            },
            {
                label: util_1.i18n.getString("help"),
                submenu: [
                    {
                        label: util_1.i18n.getString("help.documentation"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Documentation); }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: util_1.i18n.getString("help.about"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.About); }
                    }
                ]
            }
        ];
        this._menu = Menu.buildFromTemplate(options);
    }
    emitMenuClickEvent(_type) {
        let evt = new MenuClickEvent(_type);
        this.emit("menuClick", evt);
    }
    setApplicationMenu() {
        Menu.setApplicationMenu(this._menu);
    }
    get electronMenu() {
        return this._menu;
    }
}
exports.MainMenuView = MainMenuView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
