import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

import { StatusBar } from '@ionic-native/status-bar';

import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

declare var cordova:any;

/**
 * Generated class for the AdminProjectLinkPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-link',
  templateUrl: 'admin-project-link.html',
})
export class AdminProjectLinkPage {

  constructor(private themeableBrowser: ThemeableBrowser,  public statusBar: StatusBar, public viewCtrl: ViewController, public navCtrl: NavController, public ModalWrapperPage: ModalWrapperPage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectLinkPage');
    this.statusBar.styleLightContent();
    this.ModalWrapperPage.dismissModal();
    let project_link = this.ModalWrapperPage.modalParams.project_link;

    cordova.ThemeableBrowser.open(project_link, '_blank', {
      statusbar: {
        color: '#000000'
      },
      hiddden: 'yes',
      // clearcache: 'yes',
      toolbar: {
        height: 44,
        color: '#000000'
      },
      title: {
        color: '#ffffff',
        staticText: 'FEED100',
      },

      backButton: {
        wwwImage: 'assets/images/back.png',
        wwwImagePressed: 'assets/images/back_pressed.png',
        wwwImageDensity: 3,
        align: 'left',
        event: 'backPressed'
      },
      forwardButton: {
        wwwImage: 'assets/images/forward.png',
        wwwImagePressed: 'assets/images/forward_pressed.png',
        wwwImageDensity: 3,
        align: 'left',
        event: 'forwardPressed'
      },
      closeButton: {
        wwwImage: 'assets/images/close.png',
        wwwImagePressed: 'assets/images/close_pressed.png',
        wwwImageDensity: 3,
        align: 'right',
        event: 'closePressed'
      },
      backButtonCanClose: true
    }).addEventListener('closePressed', function(e) {
        console.log('close');

    }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
        console.error(e.message);
    }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        console.log(e.message);
    });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminProjectLinkPage');    
    this.statusBar.styleDefault();
  }

}