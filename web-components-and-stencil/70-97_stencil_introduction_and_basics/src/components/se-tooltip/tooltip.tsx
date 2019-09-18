import { h, Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'se-tooltip',
  styles: `
    #icon {
      position: relative;
      display: inline-block;
      padding: 0.3em 0.6em;
      color: white;
      background-color: black;
      border-radius: 50%;
      cursor: pointer;
    }

    #tip {
      position: absolute;
      top: 1.8em;
      color: white;
      background-color: black;
      border-radius: 3px;
      box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
      width: 10em;
      padding: 1em;
      transform: translateX(-50%);
    }
  `,
  shadow: true
})

export class Tooltip {
  @State() hidden: boolean = true;
  @Prop() tip: string;

  onToggleTip() {
    this.hidden = !this.hidden;
  }

  render() {
    return (
      <p>
        <slot />
        <div id="icon" onClick={this.onToggleTip.bind(this)}>
          ?
          {this.hidden ? null: <div id="tip">{this.tip}</div>}
        </div>

      </p>
    );
  }
}
