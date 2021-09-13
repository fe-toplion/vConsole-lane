/**
 * vConsole-resouces Plugin
 *
 * @author WechatFE
 */
import tplSource from "./template.html";
import "./style.less";

class VConsoleLanePlugin {
    constructor(vConsole) {
        this.vConsole = vConsole;
        this.$ = vConsole.$;
        this.dom = null;
        this.data = this.getData();
        return this.init();
    }

    init() {
        const vConsoleLane = new window.VConsole.VConsolePlugin("Lane", "Lane");

        vConsoleLane.on("ready", () => {
            const { $ } = this;
            // 添加
            $.delegate($.one(".vc-lane"), "click", ".addBtn", () => {
                const laneId = $.one(".vc-lane .name").value.trim();
                if (!laneId) {
                    return;
                }
                this.data.unshift({
                    laneId: laneId,
                    isOpen: true,
                });
                vConsole.tool.setStorage("laneList", JSON.stringify(this.data));
                this.renderDom();
            });
            // 删除
            $.delegate($.one(".vc-lane"), "click", ".deleteBtn", (e) => {
                const index = e.target.dataset.index;
                this.data.splice(index, 1);
                vConsole.tool.setStorage("laneList", JSON.stringify(this.data));
                this.renderDom();
            });
            // 开关
            $.delegate($.one(".vc-lane"), "click", ".slider", (e) => {
                const index = e.target.dataset.index;
                this.data[index].isOpen = !this.data[index].isOpen;
                vConsole.tool.setStorage("laneList", JSON.stringify(this.data));
                e.target.innerHTML = this.data[index].isOpen ? '开' : '关';
                this.setCookie();
            });
        });

        vConsoleLane.on("renderTab", (callback) => {
            const html = this.$.render(tplSource, { data: this.data }, true);
            callback(html);
            this.setCookie();
        });

        vConsoleLane.on("addTool", (callback) => {
            const buttons = [
                {
                    name: "Show Lane",
                    onClick: this.show,
                },
                {
                    name: "Close Lane",
                    onClick: this.close,
                },
            ];
            callback(buttons);
        });
        this.vConsole.addPlugin(vConsoleLane);
        return vConsoleLane;
    }

    getData() {
        const laneList = vConsole.tool.getStorage("laneList");
        if (laneList) {
            return JSON.parse(laneList);
        }
        return [];
    }

    renderDom() {
        const html = this.$.render(tplSource, { data: this.data });
        vConsole.$.one('.vc-lane').innerHTML = html.innerHTML;
        this.setCookie();
    }
    setCookie() {
        const name = "trace-context";
        let value = "";
        let laneList = [];
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].isOpen) {
                laneList.push(this.data[i].laneId);
            }
        }
        if (laneList.length) {
            value = encodeURIComponent(
                JSON.stringify({ laneId: laneList.join(",") })
            );
        }
        const exp = new Date();
        exp.setTime(exp.getTime() + (laneList.length ? 10 * 24 * 3600 * 1000 : 0));
        document.cookie = `${name}=${value};expires=${exp.toGMTString()};path=/`;
    }

    // show = () => {
    //     if (!this.stats) {
    //         this.stats = new Stats();
    //         this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
    //         this.dom = this.stats.dom;
    //         document.body.appendChild(this.dom);
    //         this.requestID = requestAnimationFrame(this.loop);
    //     }
    // };

    // changePanel = (type) => {
    //     if (!this.stats) {
    //         this.show();
    //     }
    //     this.stats.setMode(Number(type));
    // };

    // loop = () => {
    //     this.stats.update();
    //     this.requestID = requestAnimationFrame(this.loop);
    // };

    // close = () => {
    //     if (this.requestID) {
    //         cancelAnimationFrame(this.requestID);
    //     }
    //     if (this.dom) {
    //         document.body.removeChild(this.dom);
    //     }

    //     this.stats = null;
    //     this.requestID = null;
    //     this.dom = null;
    // };
}

window.VConsoleLanePlugin = VConsoleLanePlugin;
export default VConsoleLanePlugin;
