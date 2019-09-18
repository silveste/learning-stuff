import { h, Component, Prop, State, Method } from '@stencil/core';

@Component({
  tag: 'se-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @State() showContactInfo: boolean = false;
  @Prop({reflectToAttr: true}) title: string;
  @Prop({reflectToAttr: true}) opened: boolean;


  onCloseDrawer() {
    this.opened = false;
  }

  onTabSelected(tab: string) {
    this.showContactInfo = tab === 'contact';
  }

  @Method()
  open() {
    this.opened = true;
  }

  render(){
    /*
    Drawer visibility is controlled using CSS so no need the following code which is another way to open the drawer without CSS (depends also on prop open)
      let content = null;
      if (this.open) {
        content = (
          <aside>
            <header><h1>{this.title}</h1></header>
            <main><slot /></main>
          </aside>
        );
      }
      return content;
    */

    let mainContent = <slot />;
    if (this.showContactInfo){
      mainContent = (
        <div id="contact-information">
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email</p>
          <ul>
            <li>Phone: 01458269</li>
            <li>
              Email:
              <a href="mailto:someemail@email.com">someemail@email.com</a>
            </li>
          </ul>
        </div>
      );
    }
    return [
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>&laquo;</button>
        </header>
        <section id="tabs">
          <button
            class={!this.showContactInfo ? 'active' : ''}
            onClick={this.onTabSelected.bind(this,'nav')}>
            Navigation
          </button>
          <button
            class={this.showContactInfo ? 'active' : ''}
            onClick={this.onTabSelected.bind(this, 'contact')}>
            Contact
          </button>
        </section>
        <main>
          { mainContent }
        </main>
      </aside>,
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)}></div>
    ];
  }
}
