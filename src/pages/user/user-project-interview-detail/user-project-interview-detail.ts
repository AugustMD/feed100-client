import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content, ViewController } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

/**
 * Generated class for the UserProjectInterviewDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-interview-detail',
  templateUrl: 'user-project-interview-detail.html',
})
export class UserProjectInterviewDetailPage {
  @ViewChild(Content) content: Content;

  project_participant_id;
  
  // 지난 인터뷰 타임라인은 답변달린것만 보임
  // interviews = [
  //   {
  //     interviewRegistrationDate: "2018-01-29 00:00:00",
  //     interviewReward: 500,
  //     isLike: true,
  //     question: "Matt님 안녕하세요. 의견 잘 들었습니다!",
  //     answer: "저는 주로 먹거리 사진이나 노을이나 눈 온 뒤의 배경 등 풍경위주의 사진을 많이 찍는 편입니다.",
  //   },
  //   {
  //     interviewRegistrationDate: "2018-01-29 00:00:00",
  //     interviewReward: 500,
  //     isLike: false,
  //     question: "Matt님은 어떤 사진들을 가장 많이 찍으시나요?",
  //     answer: "인스타그램이나 페이스북 등 SNS에 올리는 경우도 있고 그냥 따로 저장하고 있기도 해요.",
  //   }
  // ];
  interviews;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public ModalWrapperPage: ModalWrapperPage,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectInterviewDetailPage');
    this.project_participant_id = this.ModalWrapperPage.modalParams.project_participant_id;
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectInterviewDetailPage');
    let loading = this.commonService.presentLoading();
    
    this.userService.getInterviews(this.project_participant_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          console.log(JSON.stringify(data.data));
          this.interviews = data.data;
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

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
    refresher.complete();
  }
}
