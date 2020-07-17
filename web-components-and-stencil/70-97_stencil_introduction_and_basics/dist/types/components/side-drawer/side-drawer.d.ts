export declare class SideDrawer {
    showContactInfo: boolean;
    title: string;
    opened: boolean;
    onCloseDrawer(): void;
    onTabSelected(tab: string): void;
    open(): void;
    render(): any[];
}
