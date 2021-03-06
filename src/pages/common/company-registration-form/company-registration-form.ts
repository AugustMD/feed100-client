import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, App, Nav } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
/**
 * Generated class for the CompanyRegistrationFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-registration-form',
  templateUrl: 'company-registration-form.html',
})
export class CompanyRegistrationFormPage {
  username: string = '';
  password: string = '';
  checkingPassword: string = '';
  nickname: string = '';
  isCheck: boolean = false;
  role: string = 'company';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public commonService: CommonServiceProvider,
    public storage: Storage,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyRegistrationFormPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyRegistrationFormPage');
  }

  back() {
    this.navCtrl.pop();
  }

  openTermsPage() {
    this.modalCtrl.create('ModalWrapperPage', { page: 'TermsPage' }).present();
  }

  openPrivateInfoPolicyPage() {
    this.modalCtrl.create('ModalWrapperPage', { page: 'PrivateInfoPolicyPage' }).present();
  }

  // localRegister() {
  //   this.commonService.showBasicAlert('현재 서비스 준비중입니다. 추후 업데이트 후 이용해주세요!');
  // }

  localRegister() {
    if(!this.username) {
      this.commonService.showBasicAlert('이메일을 입력해주세요.');
      return;
    }
    else {
      let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if(!this.username.match(regExp)) {
        this.commonService.showBasicAlert('이메일 형식이 올바르지 않습니다.');
        return;
      }
    }

    if(!this.password) {
      this.commonService.showBasicAlert('비밀번호를 입력해주세요.');
      return;
    }
    else {
      let regExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,}$/;          
      if(!this.password.match(regExp)) {
        this.commonService.showBasicAlert('비밀번호는 영문, 숫자, 특수문자 조합으로 최소 8자 이상이어야 합니다.');
        return;
      }
    }

    if(!this.checkingPassword) {
      this.commonService.showBasicAlert('비밀번호 확인을 위해 다시 한 번 입력해주세요.');
      return;
    }
    else {
      if(this.password != this.checkingPassword) {
        this.commonService.showBasicAlert('비밀번호를 다시 확인해주세요.');
        return;
      }
    }

    if(!this.nickname) {
      this.commonService.showBasicAlert('기업명 / 팀명을 입력해주세요.');
      return;
    }
    if(!this.isCheck) {
      this.commonService.showBasicAlert('이용약관 및 개인정보처리방침에 동의해주세요.');
      return;
    }

    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();

    this.commonService.localRegister(this.username, this.password, this.role, this.nickname)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.navCtrl.setRoot('LoginPage', {}, {animate: true, direction: 'forward'});
          this.commonService.showBasicAlert('해당 계정으로 이메일을 전송하였습니다.<br/>이메일 인증 완료 후 로그인해주세요.');
        }
        else if(data.success == false) {
          if(data.message == 'username is already registered') {
            this.commonService.showBasicAlert('이미 등록되어있는 이메일입니다.');
          }
          else if(data.message == 'nickname is already registered') {
            this.commonService.showBasicAlert('이미 등록되어있는 기업명 / 팀명입니다.');
          }
          else {
            this.commonService.apiRequestErrorHandler(data, this.navCtrl);
          }
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

}
