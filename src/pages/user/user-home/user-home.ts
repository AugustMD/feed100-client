import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, ModalController, App } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
/**
 * Generated class for the UserHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-home',
  templateUrl: 'user-home.html',
})
export class UserHomePage {
  @ViewChild(Slides) childSlides: Slides;

  // 상단 외부링크 슬라이드
  feed100IntroSlides = [
    {
      link: 'AppIntroPage',
      bg: 'assets/img/feed100-intro-slide1.png',
      title: '가치를 같이 만들어가요!',
      content: '기업은 유저가 원하는 가치가 무엇인지!<br/>유저는 기업의 서비스를 더욱 가치있게!',
    },
    {
      link: 'TutorialPage',
      bg: 'assets/img/feed100-intro-slide2.png',
      title: '이렇게 진행합니다!',
      content: 'FEED100 서비스 튜토리얼을 확인해 주세요.<br/>단계별로 어떻게 진행하는지 확인할 수 있습니다.',
    },
    {
      link: 'HelpPage',
      bg: 'assets/img/feed100-intro-slide3.png',
      title: '어려움이 있으신가요?',
      content: '궁금한 점이 있다면 도움말을 확인해 보세요!<br/>여러분을 위하여 최선을 다하겠습니다.',
    }
  ];
  
  // 진행중인 프로젝트
  proceedingProjects = [];

  // 새로운 프로젝트
  newProjects = [];

  // 새로운 뉴스피드
  newNewsfeeds = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserHomePage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserHomePage');
    let loading = this.commonService.presentLoading();
    
    this.userService.getUserHome()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.proceedingProjects = data.data.proceeding_projects;
          this.newProjects = data.data.new_projects;
          this.newNewsfeeds = data.data.new_newsfeeds;
          this.userService.setAlarmAndInterviewNum();
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewWillEnter();
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );
  }

  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
    refresher.complete();
  }

  openPageWrapper(page) {
    switch(page) {
      case 'AppIntroPage':
        this.openAppIntroPage();
        break;
      case 'TutorialPage':
        this.openUserTutorialPage();
        break;
      case 'HelpPage':
        this.openUserHelpPage();
        break;
    }
  }

  accessProjectCard(project_id) {
    this.userService.accessProjectCard(this, project_id);
  }

  openUserProjectPage() {
    this.navCtrl.parent.select(1);
  }

  openAppIntroPage() {
    let appIntroModal = this.modalCtrl.create('ModalWrapperPage', {page: 'AppIntroPage'});
    appIntroModal.present();
  }

  openUserTutorialPage() {
    this.navCtrl.push('UserTutorialPage');
  }

  openUserHelpPage() {
    let manualModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserHelpPage'});
    manualModal.present();
  }

  openUserNewsfeedStoryPage(newsfeed_id) {
    this.navCtrl.push('UserNewsfeedStoryPage', { "newsfeed_id" : newsfeed_id });
  }

  openProjectPage() {
    this.navCtrl.parent.select(1);
  }

  getAlarmNum() {
    return this.userService.alarmNum;
  }

  openUserAlarmPage() {
    this.navCtrl.push('UserAlarmPage');
  }

  openUserConfigurePage() {
    this.navCtrl.push('UserConfigurePage');
  }

}
