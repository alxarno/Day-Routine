export default class CoreModule {
    constructor(props) {
        if (props.hasOwnProperty('storage')) {
            this.storage = props['storage'];
        }
        if (props.hasOwnProperty('cash')) {
            this.cash = props['cash'];
        }
    }
}
//# sourceMappingURL=module.js.map