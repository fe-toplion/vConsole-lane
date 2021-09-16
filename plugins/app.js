import VConsoleLanePlugin from './lane';

export {
    VConsoleLanePlugin
}

export default class VConsolePluginTools {
    constructor(vConsole) {
        new VConsoleLanePlugin(vConsole);
    }
}

window.VConsolePluginTools = VConsolePluginTools;