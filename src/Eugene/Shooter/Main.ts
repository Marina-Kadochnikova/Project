import { Spine } from "pixi-spine";
import Bush from "./Bush";
import Buttons from "./Buttons";
import Collision from "./Collision";
import Col_Player from "./Col_Player";
import Enemy from "./Enemy";
import Shot from "./Shot";

export default class Main {
    public animation:   Spine;
    public spineAnim: any;
    public ikCross: any;
    public buttons: Buttons; 
    public sh_ht: Shot; 
    public run: any;
    public col_player: Col_Player;
    public bush: Bush[];
    public timer: number;
    public timer_enemy: number;
    public dead:boolean;
    public enemy: Enemy;
    constructor() {
        this.addSpineBoy();
        this.timer = 0;
        this.timer_enemy = 0;

        const texture = PIXI.Texture.from("src/Eugene/Shooter/Image/bg.jpg");
        const tilingSprite = new PIXI.TilingSprite(
            texture,
            window.app.screen.width,
            window.app.screen.height,
        );
        window.app.stage.addChild(tilingSprite);

        this.bush = [];

        for (let i = 0; i < 2; i++) {
            this.bush[i] = new Bush();
        }

        this.enemy = new Enemy();

        this.buttons = new Buttons();
        this.buttons.jump.on('pointerdown', this.Jump.bind(this));
        this.buttons.down.on('pointerdown', this.Down.bind(this));
        this.buttons.shoot.on('pointerdown', this.Shot.bind(this));
        this.buttons.reload.on('pointerdown', this.Reloading.bind(this));
        
        this.sh_ht = new Shot();
        this.col_player = new Col_Player();

        window.setTimeout ( () => {
            window.app.ticker.add ((d) => {
                if (this.sh_ht.count_heart > 0) {
                    this.buttons.AddInteractive();

                    if (this.isAnimPlaying('jump') === 1 && this.col_player.jump) {
                        this.buttons.jump_b = false;
                        this.buttons.down_b = true;
                    }
                    else {
                        this.buttons.jump_b = true;
                        this.buttons.down_b = false;
                    }

                    tilingSprite.tilePosition.x -= 10;

                    if (this.col_player.jump) {
                        this.col_player.tween.update(window.app.ticker.elapsedMS);
                    }

                    this.Bullets();
                    this.Bush();
                    this.Monster();
                }
                else if (!this.dead) {
                    this.buttons.DeleteInteractive();
                    this.animation.state.addAnimation(0, 'death', false, 0)
                    this.animation.state.addAnimation(1, 'death', false, 0)
                    this.animation.state.addAnimation(2, 'death', false, 0)
                    this.animation.state.addAnimation(3, 'death', false, 0)
                    this.dead = true;
                }
            })
        }, 4700);
    }

    addSpineBoy(): void {
        window.app.loader
            .add('spineCharacter', 'assets/spineboy-pro.json')
            .load((loader, resources) => {
                this.animation = new Spine(resources.spineCharacter.spineData);
                this.animation.x = 400;
                this.animation.width = 300;
                this.animation.height = 450;
                this.animation.y = window.app.screen.height - 100;
                // add the animation to the scene and render...
                window.app.stage.addChild(this.animation);

                if (this.animation.state.hasAnimation('aim') && this.animation.state.hasAnimation('hoverboard')) {
                    // run forever, little boy!

                    this.animation.state.setAnimation(0, 'portal', false);
                    this.animation.state.addAnimation(1, 'aim', true, 0).mixDuration = 0.2;
                    this.animation.state.addAnimation(0, 'run', true, 0).mixDuration = 0.2;

                    // dont run too fast
                    this.animation.state.timeScale = 0.8;
                    this.spineAnim = this.animation;

                    this.ikCross = this.spineAnim.skeleton.ikConstraints[0].target;
                    this.ikCross.x = window.app.screen.width + 300;
                    this.ikCross.y = 200;
                }

            });
    }

    Jump() {
        if (this.buttons.jump_b) {
            this.animation.state.setAnimation(1, 'jump', false);
            this.animation.state.addAnimation(1, 'run', true, 0).mixDuration = 0.2;
            this.animation.state.addAnimation(2, 'aim', true, 0).mixDuration = 0.2;
            this.buttons.jump_b = false;
            this.col_player.Jump();
        }
    }

    Down() {
        if (this.buttons.down_b) {
            this.animation.state.setAnimation(1, 'run', true).mixDuration = 0.2;
            this.buttons.down_b = false;
            this.col_player.Down();
        }
    }

    Shot() {
        if (this.sh_ht.count_shot > 0 && !this.sh_ht.reload_b) {
            this.animation.state.setAnimation(2, 'shoot', false);
            this.animation.state.setAnimation(3, 'aim', true).mixDuration = 0.2;
            this.sh_ht.Shot(this.col_player.col_player.y + 170);
        }
    }

    Reloading() {
        if (!this.sh_ht.reload_b && this.sh_ht.count_shot < 5) {
            this.sh_ht.Reloading();
        }
    }

    isAnimPlaying(name: string): number {
        for (let i = 0; i < this.animation.state.tracks.length; i++) {
            let track = this.animation.state.tracks[i];
            if (track.animation && track.animation.name === name) {
                return i;
            }
        }
        return -1;
    }

    Monster(){
        if (this.enemy.count_heart > 0) {
            if (this.timer_enemy >= 1000 && !this.enemy.add_enemy) {
                this.enemy.AddEnemy();
            }

            if (this.timer_enemy < 1000 && !this.enemy.add_enemy) {
                this.timer_enemy++;
            }

            if(this.enemy.add_enemy) {
                this.enemy.tween.update(window.app.ticker.elapsedMS);
                if (Collision.Collision(this.col_player.col_player, this.enemy.enemy) === 1 && !this.enemy.remove_heart && !this.enemy.death) {
                    this.enemy.remove_heart = true;
                    this.sh_ht.RemoveHeart();
                }
            }

            if(this.enemy.add_timer) {
                this.enemy.timer++;
            }
            
            if(this.enemy.timer > 1000 && this.enemy.add_timer) {
                this.enemy.add_timer = false;
                this.timer_enemy = 0;
                this.enemy.AddMove();
            }
        }
        else if (!this.enemy.death){
            this.timer_enemy = 0;
            this.enemy.Dead();
        }
        else {
            this.enemy.tween.update(window.app.ticker.elapsedMS);
        }
    }

    Bush() {
        this.timer++;
        if (this.timer === 100) {
            this.timer = 0;
            if (!this.bush[0].add_bush) {
                this.bush[0].AddBush();
            }
            else {
                this.bush[1].AddBush();
            }
        }

        for (let i = 0; i < this.bush.length; i++) {
            if (this.bush[i].add_bush) {
                this.bush[i].tween.update(window.app.ticker.elapsedMS);
                if (Collision.Collision(this.col_player.col_player, this.bush[i].bush) == 1 && !this.bush[i].remove_heart) {
                    this.bush[i].remove_heart = true;
                    this.sh_ht.RemoveHeart();
                }
            }
        }
    }

    Bullets() {
        if (this.sh_ht.reload_b) {
            this.sh_ht.tween.update(window.app.ticker.elapsedMS);
        }

        for (let i = 0; i < 5; i++) {
            if (this.sh_ht.bullets[i].shot_b) {
                this.sh_ht.bullets[i].tween.update(window.app.ticker.elapsedMS);
                if (Collision.Collision(this.sh_ht.bullets[i].bullet, this.enemy.enemy) == 1) {
                    this.enemy.RemoveHeart();
                    this.sh_ht.bullets[i].tween.destroy();
                    this.sh_ht.bullets[i].bullet.x = -50;
                }
            }
        }
    }
}
