import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { UserTabsPage } from '../../user/user-tabs/user-tabs';
import { UserSnsRegistrationFormPage } from '../user-sns-registration-form/user-sns-registration-form'

import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';

declare var KakaoTalk;
/**
 * Generated class for the UserLoginFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-login-form',
  templateUrl: 'user-login-form.html',
})
export class UserLoginFormPage {
  username: string = '';
  password: string = '';
  role: string = 'user';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public alertCtrl: AlertController,
    public commonService: CommonServiceProvider,
    public storage: Storage,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    public zone: NgZone) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLoginFormPage');
  }

  back() {
    this.navCtrl.pop();
  }

  localLogin() {
    if(!this.username) {
      this.commonService.showBasicAlert('이메일을 입력해주세요.');
      return;
    }
    if(!this.password) {
      this.commonService.showBasicAlert('비밀번호를 입력해주세요.');
      return;
    }

    let loading = this.commonService.presentLoading();

    this.commonService.localLogin(this.username, this.password, this.role)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.storage.set('accessToken', data.data.accessToken);
          this.storage.set('refreshToken', data.data.refreshToken);
          this.navCtrl.setRoot(UserTabsPage, {"isLogin" : true}, {animate: true, direction: 'forward'});
        }
        else if(data.success == false) {
          switch(data.message) {
            case 'username is unregistered':
              this.commonService.showBasicAlert('이메일을 정확히 입력해주세요.');
              break;
            case 'password is not correct':
              this.commonService.showBasicAlert('비밀번호를 정확히 입력해주세요.');
              break;
          }
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );
  }

  googleLogin() {
    let loading = this.commonService.presentLoading();

    this.googlePlus.login({})
    .then(res => {
      console.log(res);
      this.commonService.SNSLogin('google', res.userId, this.role)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
      (data) => {
        if(data.success == true) {
          this.storage.set('accessToken', data.data.accessToken);
          this.storage.set('refreshToken', data.data.refreshToken);
          this.googlePlus.logout()
          .then(() => {
            this.navCtrl.setRoot(UserTabsPage, {"isLogin" : true}, {animate: true, direction: 'forward'});
          });
        }
        else if(data.success == false) {
          switch(data.message) {
            case 'app_id is unregistered':
              this.navCtrl.push(UserSnsRegistrationFormPage, {
                "provider" : "google",
                "app_id" : res.userId
              });
              break;
          }
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
      );
    })
    .catch(err => {
      console.error(err);
      this.commonService.showBasicAlert('오류가 발생했습니다.');
      loading.dismiss();
    });
  }

  facebookLogin() {
    console.log(this.zone.isStable);
    console.log(this.zone.hasPendingMacrotasks);
    console.log(this.zone.hasPendingMicrotasks);

    let loading = this.commonService.presentLoading();

    this.fb.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) => {
      console.log('Logged into Facebook!', res);
      console.log(res.authResponse.userID);
      this.commonService.SNSLogin('facebook', res.authResponse.userID, this.role)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
      (data) => {
        if(data.success == true) {
          console.log(this.zone.isStable);
          console.log(this.zone.hasPendingMacrotasks);
          console.log(this.zone.hasPendingMicrotasks);
      
          this.storage.set('accessToken', data.data.accessToken);
          this.storage.set('refreshToken', data.data.refreshToken);
          this.navCtrl.setRoot(UserTabsPage, {"isLogin" : true}, {animate: true, direction: 'forward'});
        }
        else if(data.success == false) {
          switch(data.message) {
            case 'app_id is unregistered':
              this.navCtrl.push(UserSnsRegistrationFormPage, {
                "provider" : "facebook",
                "app_id" : res.authResponse.userID
              });
              break;
          }
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
      );
    })
    .catch(e => {
      console.log('Error logging into Facebook', e);
      this.commonService.showBasicAlert('오류가 발생했습니다.');
      loading.dismiss();
    });

  }

  kakaoLogin() {
    // this.commonService.showBasicAlert('준비중입니다!');

    let loading = this.commonService.presentLoading();
    
    KakaoTalk.login(
    (result) => {
    console.log("result :", result);      
    console.log('Successful login!');
    console.log(result.id);
    this.commonService.SNSLogin('kakao', result.id, this.role)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
    (data) => {
      if(data.success == true) {
        this.zone.run(() => {
          this.storage.set('accessToken', data.data.accessToken);
          this.storage.set('refreshToken', data.data.refreshToken);
          this.navCtrl.setRoot(UserTabsPage, {"isLogin" : true}, {animate: true, direction: 'forward'});
        });
      }
      else if(data.success == false) {
        this.zone.run(() => {
          switch(data.message) {
            case 'app_id is unregistered':
              this.navCtrl.push(UserSnsRegistrationFormPage, {
                "provider" : "kakao",
                "app_id" : result.id
              });
              break;
          }
        });          
      }
    },
    (err) => {
      console.log(err);
      this.commonService.showBasicAlert('오류가 발생했습니다.');
    }
    );
  },
    (message) => {
      console.log('Error logging in');
      console.log(message);
      loading.dismiss();    
    }
  );
  }

}
