import * as PIXI from 'pixi.js';
import Fantasia from '../Fantasia.js';

export default class Button extends PIXI.Container {

  private readonly onBackground: PIXI.Graphics;
  private readonly offBackground: PIXI.Graphics;
  private status: boolean;
  constructor(label: PIXI.Text, bgColor: number, edgeColor: number, width: number, height: number) {
    super();
    this.interactive = true;
    this.onBackground = (()=>{
      const g = new PIXI.Graphics();
      g.beginFill(edgeColor, 1);
      g.lineStyle(5, edgeColor, 1);
      g.drawRoundedRect(0, 0, width, height, 30);
      g.lineStyle(0, 0);
      g.endFill();
      return g;
    })();

    this.offBackground = (()=>{
      const g = new PIXI.Graphics();
      g.beginFill(bgColor, 1);
      g.lineStyle(3, edgeColor, 1);
      g.drawRoundedRect(0, 0, width, height, 30);
      g.lineStyle(0, 0);
      g.endFill();
      return g;
    })();

    this.addChild(this.offBackground);
    this.status = false;
    this.addChild(label);
    label.anchor.x = 0.5;
    label.anchor.y = 0.5;
    label.x = this.offBackground.width/2;
    label.y = this.offBackground.height/2;

    /**
     * FIXME: おした状態でmouseoutした時の状態の整合性がおかしいのを直す
     */
    this.on('mousedown', () => {
      this.status = true;
      this.switchTo(true);
    });
    this.on('mouseup', () => {
      if(this.status) {
        this.status = false;
        this.switchTo(false);
      }
    });
    this.on('mouseout', () => {
      if(this.status) {
        this.switchTo(false);
      }
    });
    this.on('mouseover', () => {
      if(this.status) {
        this.switchTo(true);
      }
    });
      
  }

  switchTo(status: boolean) {
    if(status) {
      this.removeChild(this.offBackground);
      this.addChildAt(this.onBackground, 0);
    } else {
      this.removeChild(this.onBackground);
      this.addChildAt(this.offBackground, 0);
    }
  }

  move(delta: number) {
  }
}