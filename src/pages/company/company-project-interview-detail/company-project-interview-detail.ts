import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content, ActionSheetController } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { Keyboard } from '@ionic-native/keyboard';

declare var cordova:any;

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';

/**
 * Generated class for the CompanyProjectInterviewDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-interview-detail',
  templateUrl: 'company-project-interview-detail.html',
})
export class CompanyProjectInterviewDetailPage {
  @ViewChild(Content) content: Content;
  project_id;
  project_participant_id;
  isHelpHide: boolean;
  // nickname: String = "포텐브라더스";
  // avatar_image = "./../../assets/img/user-avatar-image-man1.png";
  // totalInterviewNum: number = 1;
  nickname;
  avatar_image;
  minTextLength: number = 20;
  maxTextLength: number = 100;
  
  questionInterview: string = "";
  // projectKeywords = ["버튼위치","어려움","파일업로드","버튼위치","어려움","파일업로드"];
  helpReferances = ["~에 대하여 어떻게 생각하시나요?", "~에 대하여 자세히 말씀해주세요.", "~했던 경험에 대하여 말씀해주세요.", "왜 그렇게 생각하셨나요?"]

  // 기본 인터뷰 정보
  // project_participation_date = "2018-01-29 00:00:00";
  // region = "대전광역시"; age = "50대+"; gender = "남자"; job = "관리자"; marriage = "기혼"
  // phone_os = "iOS"; phone_model = "iPhone9,3";
  // project_participation_objective_conditions = [{"value": "예. 있습니다.", "question": "장례식장에 참여해본 경험이 있으십니까?"}, {"value": "예. 있습니다.", "question": "지인의 장례식장에 참석하지 못한 경험이 있으십니까?"}]
  // preferred_interview_time = "22시 ~ 24시";
  // project_first_impression_rate = 10;
  project_participation_date;
  region; age; gender; job; marriage;
  phone_os; phone_model;
  project_participation_objective_conditions = [];
  preferred_interview_time;
  project_first_impression_rate;

  interviews = [
    // {
    //   interview_request_registration_date: "2018-03-25 00:00:00",
    //   interview_request: "뭐가 제일 만족스러웠나요요?????????",
    //   interview_id: 1,
    //   interview_response_registration_date: "2018-03-27 00:00:00",
    //   interview_response: "나의 대답을 받아라! 만족한걸 만족했다! 만족했나?",
    //   isLike: false,
    // },
    // {
    //   interview_request_registration_date: "2018-03-25 00:00:00",
    //   interview_request: "뭐가 제일 만족스러웠나요요?????????",
    //   interview_id: 1,
    //   interview_response_registration_date: "2018-03-27 00:00:00",
    //   interview_response: "나의 대답을 받아라! 만족한걸 만족했다! 만족했나?",
    //   isLike: false,
    // },
    // {
    //   interview_request_registration_date: "2018-03-25 00:00:00",
    //   interview_request: "뭐가 제일 만족스러웠나요요?????????",
    //   interview_id: 1,
    //   interview_response_registration_date: "2018-03-27 00:00:00",
    //   interview_response: "나의 대답을 받아라! 만족한걸 만족했다! 만족했나?",
    //   isLike: false,
    // },
    // {
    //   interview_request_registration_date: "2018-03-25 00:00:00",
    //   interview_request: "뭐가 제일 만족스러웠나요요?????????",
    //   interview_id: 1,
    //   interview_response_registration_date: "2018-03-27 00:00:00",
    //   interview_response: "나의 대답을 받아라! 만족한걸 만족했다! 만족했나?",
    //   isLike: false,
    // },
    // {
    //   interview_request_registration_date: "2018-03-25 00:00:00",
    //   interview_request: "뭐가 제일 만족스러웠나요요?????????",
    //   interview_id: 1,
    //   interview_response_registration_date: "",
    //   interview_response: "",
    //   isLike: false,
    // }
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public keyboard: Keyboard,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider,
    public actionSheetCtrl: ActionSheetController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectInterviewDetailPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.navParams.get('project_id');    
    this.project_participant_id = this.navParams.get('project_participant_id');
    this.keyboard.disableScroll(false); // 추가
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyProjectInterviewDetailPage');
    this.isHelpHide = true;
    let loading = this.commonService.presentLoading();
    
    this.companyService.getInterviews(this.project_participant_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.nickname = data.data.nickname;
          this.avatar_image = data.data.avatar_image;
          this.project_participation_date = data.data.project_participation_date;
          this.region = data.data.region;
          this.age = data.data.age;
          this.gender = data.data.gender;
          this.job = data.data.job;
          this.marriage = data.data.marriage;
          this.phone_os = data.data.phone_os;
          this.phone_model = data.data.phone_model;
          this.project_participation_objective_conditions = JSON.parse(data.data.project_participation_objective_conditions);
          this.preferred_interview_time = data.data.preferred_interview_time;
          this.project_first_impression_rate = data.data.project_first_impression_rate;
          this.interviews = data.data.interviews;
          setTimeout(() => {
            this.content.scrollToBottom();
          }, 500);
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

  reportInterview() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '신고하기',
          role: 'destructive',
          handler: () => {
            this.commonService.showConfirmAlert('해당 내용을 부적절한<br>게시글로 신고하시겠습니까?', 
            () => {
              this.commonService.showBasicAlert('신고가 접수되었습니다.');
            });        
          }
        },{
          text: '취소하기',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  back() {
    this.navCtrl.pop();
    this.keyboard.disableScroll(true); // 추가
  }

  clickLike(interview) {
    if(!interview.is_like) {
      this.commonService.showConfirmAlert('해당 내용이 만족스러우셨나요?<br/>찜한 인터뷰는 종합 보고서에서 확인하실 수 있습니다.', 
      () => {
        this.commonService.isLoadingActive = true;
        let loading = this.commonService.presentLoading();
        
        this.companyService.likeInterview(interview.interview_id)
        .finally(() => {
          loading.dismiss();
        })
        .subscribe(
          (data) => {
            if(data.success == true) {
              interview.is_like = 1;
              this.commonService.showBasicAlert('찜했습니다. 종합 보고서에서 확인하세요!');
            }
            else if(data.success == false) {
              this.commonService.apiRequestErrorHandler(data, this.navCtrl)
              .then(() => {
                this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
              })
            }
          },
          (err) => {
            console.log(err);
            this.commonService.showBasicAlert('오류가 발생했습니다.');
          }
        );  
      });        
    }
  }

  sendInterview() {
    if(this.commonService.hasEmoji(this.questionInterview)) {
      return false;
    }
    this.commonService.showConfirmAlert('해당 내용으로 인터뷰를 요청하시겠습니까?<br/>작성 후에는 수정하거나 삭제할 수 없습니다.', 
    () => {
      this.commonService.isLoadingActive = true;
      let loading = this.commonService.presentLoading();
      this.questionInterview = this.commonService.textAreaFilter(this.questionInterview);
      
      this.companyService.requestInterview(this.project_id, this.project_participant_id, this.questionInterview)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
        (data) => {
          if(data.success == true) {
            this.questionInterview = "";
            this.ionViewWillEnter();
            this.commonService.showBasicAlert('전송되었습니다!<br/>답변이 도착하면 알림과 푸시 알림을 통해<br/>알려드리겠습니다.');            
          }
          else if(data.success == false) {
            this.commonService.apiRequestErrorHandler(data, this.navCtrl)
            .then(() => {
              this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
            })
          }
        },
        (err) => {
          console.log(err);
          this.commonService.showBasicAlert('오류가 발생했습니다.');
        }
      );  
    });        
  }

  help() {
    if(this.isHelpHide) {
      this.isHelpHide = false;
      document.querySelector(".scroll-content")['style'].overflow = 'hidden';
    } else {
      this.isHelpHide = true;
      document.querySelector(".scroll-content")['style'].overflow = 'scroll';
    }
  }

  textCount(text: string) {
    if(text == null) return 0;
    
    let temp: any;
    temp = text.replace(/<br *\/?>/gi, '');
    temp = temp.replace(/(?:\r\n|\r|\n|\s)/g, '');
    return temp.length;
  }

  countColor(count) {
    if(count < 20) { return "#8f8f8f" }
    else if(count <= 100) { return "#23799d" }
    else { return "#ce522f" }
  }

  pointNotice(count) {
    if(count < 20) {return "20자 이상 입력해주세요!" }
    else if(count <= 100) { return "질문이 어렵다면 ?를 터치하여 보세요!" }
    else { return "과유불급! 너무 길면 부담을 느껴요!" } 
  }

  // insertKeyword(keyword) {
  //   this.questionInterview = this.questionInterview + keyword;
  // }

  openInterviewInfo() {
    cordova.ThemeableBrowser.open('https://m.blog.naver.com/feed100_help/221235914864', '_system');
  }
}
