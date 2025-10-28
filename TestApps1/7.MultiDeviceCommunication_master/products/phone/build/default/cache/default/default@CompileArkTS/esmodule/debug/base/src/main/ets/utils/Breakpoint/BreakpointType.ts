import { BreakpointConstants } from "@bundle:com.example.multdevicecommunication/phone@base/ets/constants/BreakpointConstants";
export class BreakpointType<T> {
    static currentBreakpoint: string = BreakpointConstants.BREAKPOINT_SM;
    sm: T;
    md: T;
    lg: T;
    constructor(sm: T, md: T, lg: T) {
        this.sm = sm;
        this.md = md;
        this.lg = lg;
    }
    GetValue(currentBreakpoint: string): T {
        if (currentBreakpoint === BreakpointConstants.BREAKPOINT_MD) {
            return this.md;
        }
        if (currentBreakpoint === BreakpointConstants.BREAKPOINT_LG) {
            return this.lg;
        }
        else {
            return this.sm;
        }
    }
}
