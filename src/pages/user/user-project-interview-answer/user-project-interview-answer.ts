// import { Component, ViewChild } from '@angular/core';
// import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Content, Platform } from 'ionic-angular';

// import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

// import { CommonServiceProvider } from '../../../providers/common-service/common-service';
// import { UserServiceProvider } from '../../../providers/user-service/user-service';
// import { DomSanitizer } from '@angular/platform-browser';

// /**
//  * Generated class for the UserProjectInterviewAnswerPage page.
//  *
//  * See http://ionicframework.com/docs/components/#navigation for more info
//  * on Ionic pages and navigation.
//  */

// @IonicPage()
// @Component({
//   selector: 'page-user-project-interview-answer',
//   templateUrl: 'user-project-interview-answer.html',
// })
// export class UserProjectInterviewAnswerPage {
//   // @ViewChild('input') myInput ;

//   project_id;
//   project_participant_id;
//   interview_id;

//   interviewQuestion;
//   is_max;

//   // interviewQuestion: string = "프로젝트 테스트를 진행하면서 가장 불편했던 사항이 무엇이였나요?";
//   reward: number;
//   textcount: number;

//   // is_max: boolean = false;

//   answerContent: string = "";
//   contentPlaceholder: string = '이 부분을 터치하여 인터뷰 질문에 답변해 주세요.';
//   minTextLength: number = 20;
//   maxTextLength: number = 50;
//   isHelpHide: boolean;

//   constructor(
//     public navCtrl: NavController, 
//     public navParams: NavParams, 
//     public modalCtrl: ModalController, 
//     public viewCtrl: ViewController,
//     public commonService: CommonServiceProvider,
//     public userService: UserServiceProvider,
//     public ModalWrapperPage: ModalWrapperPage,
//     private platform: Platform,    
//     private domSanitizer: DomSanitizer) {
//       this.initializeBackButtonCustomHandler();
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad UserProjectInterviewAnswerPage');
//     this.project_id = this.ModalWrapperPage.modalParams.project_id;    
//     this.project_participant_id = this.ModalWrapperPage.modalParams.project_participant_id;
    
//     this.isHelpHide = true;
//   }

//   ionViewWillEnter() {    
//     console.log('ionViewWillEnter UserProjectInterviewAnswerPage');
//     let loading = this.commonService.presentLoading();
    
//     this.userService.getInterview(this.project_participant_id)
//     .finally(() => {
//       loading.dismiss();
//     })
//     .subscribe(
//       (data) => {
//         if(data.success == true) {
//           this.interview_id = data.data.interview_id;
//           this.interviewQuestion = data.data.interview_question;
//           this.is_max = data.data.is_max;
//         }
//         else if(data.success == false) {
//           this.commonService.apiRequestErrorHandler(data, this.navCtrl)
//           .then(() => {
//             this.ionViewWillEnter();
//           })
//         }
//       },
//       (err) => {
//         console.log(err);
//         this.commonService.showBasicAlert('오류가 발생했습니다.');
//       }
//     );

//   }

//   initializeBackButtonCustomHandler() {
//     this.ModalWrapperPage.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
//         this.customHandleBackButton();
//     }, 10);
//   }

//   customHandleBackButton() {
//     if(this.isHelpHide) {
//       this.dismiss();
//     } 
//     else {
//       this.help();
//     }
//   }

//   completeEditor() {
//     if(this.commonService.hasEmoji(this.answerContent)) {
//       return false;
//     }
//     this.commonService.showConfirmAlert('작성을 완료하시겠습니까?<br>작성 후에는 수정할 수 없으며,<br>부적절한 글을 작성할 경우 삭제 및 프로젝트에서 제외될 수 있습니다.', 
//       () => {
//         this.commonService.isLoadingActive = true;
//         let loading = this.commonService.presentLoading();
//         this.answerContent = this.commonService.textAreaFilter(this.answerContent);
        
//         this.userService.answerInterview(this.project_id, this.project_participant_id, this.interview_id, this.answerContent, this.reward)
//         .finally(() => {
//           loading.dismiss();
//         })
//         .subscribe(
//             (data) => {
//             if(data.success == true) {
//               if(this.is_max) {
//                 this.commonService.showToast('우수 참여자로 선정될 가능성이 높아졌어요!');
//               }
//               else {
//                 this.commonService.showToast('+ ' + this.reward + ' 포인트가 적립되었습니다.');
//               }
//               this.ModalWrapperPage.dismissModal("refresh");
//             }
//             else if(data.success == false) {
//               this.commonService.apiRequestErrorHandler(data, this.navCtrl)
//               .then(() => {
//                 this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
//               });
//             }
//           },
//           (err) => {
//             console.log(err);
//             this.commonService.showBasicAlert('오류가 발생했습니다.');
//           }
//         );

//       }
//     );
//   }

//   dismiss() {
//     this.commonService.showConfirmAlert('취소하실 경우 현재까지 작성한 내용이 저장되지 않습니다. 그래도 취소하시겠습니까?', 
//     () => {
//       this.ModalWrapperPage.dismissModal("cancel");
//     });
//   }

//   help() {
//     if(this.isHelpHide) {
//       this.isHelpHide = false;
//       document.querySelector(".editor-modal .scroll-content")['style'].overflow = 'hidden';
//     } else {
//       this.isHelpHide = true;
//       document.querySelector(".editor-modal .scroll-content")['style'].overflow = 'scroll';
//     }
//   }

//   insertKeyword(keyword) {
//     this.answerContent = this.answerContent + keyword;
//   }

//   openUserProjectStoryVerticalPage() {
//     console.log('story open');
//     this.ModalWrapperPage.unRegisterBackButtonCustomHandler();
//     let userProjectStoryVerticalModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectStoryVerticalPage', params: { "project_id" : this.project_id }});
//     userProjectStoryVerticalModal.present();
//     userProjectStoryVerticalModal.onDidDismiss(() => {
//       console.log('story close');
//       this.initializeBackButtonCustomHandler();
//     });

//   }

//   openUserProjectInterviewDetailPage() {
//     console.log('detail open');
//     this.ModalWrapperPage.unRegisterBackButtonCustomHandler();
//     let userProjectInterviewDetailModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectInterviewDetailPage', params: { "project_participant_id" : this.project_participant_id }});
//     userProjectInterviewDetailModal.present();
//     userProjectInterviewDetailModal.onDidDismiss(() => {
//       console.log('detail close');
//       this.initializeBackButtonCustomHandler();
//     });
//   }

//   textCount(text: string) {
//     if(text == null) return 0;
    
//     let temp: any;
//     temp = text.replace(/<br *\/?>/gi, '');
//     temp = temp.replace(/(?:\r\n|\r|\n|\s)/g, '');
//     return temp.length;
//   }

//   textCountPercent(text: string) {
//     let count = this.textCount(text)
//     if(count <= this.maxTextLength ) {
//       return (this.textCount(text) / this.maxTextLength) * 100;
//     } else {
//       return 100;
//     }
//   }

//   countColor(count) {
//     if(count < 20) { return "#4e4e4c" }
//     else if(count < 30) { return "#7a3c8e" }
//     else if(count < 40) { return "#23799d" }
//     else if(count < 50) { return "#62941b" }
//     else if(count < 100) { return "#f59926" }
//     else { return "#ce522f" }
//   }

//   pointNotice(count) {
//     if(count < 20) {return "20자 이상 입력해주세요!" }
//     else if(count < 30) { return "더 많은 포인트를 향하여!" }
//     else if(count < 40) { return "좋아요! 잘하고 있어요!" }
//     else if(count < 50) { return "필력이 대단하네요!"}
//     else if(count < 100) { return "당신의 정성에 감동했어요!" }
//     else { return "훌륭해요! 더 이상 바랄게 없어요." } 
//   }

//   rewardPoint(count) {
//     if(count < 20) { this.reward = 0; }
//     else if(count < 50) { this.reward = (Math.floor(count/10))*100; }
//     else { this.reward = 500; }
//     return this.reward;
//   }
// }


import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Content, Platform } from 'ionic-angular';

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the UserProjectInterviewAnswerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-interview-answer',
  templateUrl: 'user-project-interview-answer.html',
})
export class UserProjectInterviewAnswerPage {
  project_id;
  project_participant_id;
  interview_id;

  interviewQuestion;
  is_max;
  reward: number;
  textcount: number;

  answerContent: string = "";
  contentPlaceholder: string = '이 부분을 터치하여 인터뷰 질문에 답변해 주세요.';
  minTextLength: number = 20;
  maxTextLength: number = 50;
  isHelpHide: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public ModalWrapperPage: ModalWrapperPage,
    private platform: Platform,    
    private domSanitizer: DomSanitizer) {
      this.initializeBackButtonCustomHandler();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectInterviewAnswerPage');
    this.isHelpHide = true;
    this.project_id = 1;    
    this.project_participant_id = 1;
  }

  ionViewWillEnter() {    
    console.log('ionViewWillEnter UserProjectInterviewAnswerPage');

    this.interview_id = 1;
    this.interviewQuestion = "검색해보시는 정성에 너무 감사하네요~^^\n고기구울 때 뿐만 아니라 불쏘시개 없이도 손으로 숯을 만질 수 있답니다.\n쵸코과자님은 따로 가정에서는 뜨거운 냄비를 옮기거나 하실때 사용하시는 도구는 어떤 것을 이용하시나요?\n정성에감동";
    this.is_max = false;
  }

  initializeBackButtonCustomHandler() {
    this.ModalWrapperPage.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
        this.customHandleBackButton();
    }, 10);
  }

  customHandleBackButton() {
    if(this.isHelpHide) {
      this.dismiss();
    } 
    else {
      this.help();
    }
  }

  completeEditor() {
    if(this.commonService.hasEmoji(this.answerContent)) {
      return false;
    }
    this.commonService.showConfirmAlert('작성을 완료하시겠습니까?<br>작성 후에는 수정할 수 없으며,<br>부적절한 글을 작성할 경우 삭제 및 프로젝트에서 제외될 수 있습니다.', 
      () => {
        this.commonService.isLoadingActive = true;
        let loading = this.commonService.presentLoading();
        this.answerContent = this.commonService.textAreaFilter(this.answerContent);
        
        this.userService.answerInterview(this.project_id, this.project_participant_id, this.interview_id, this.answerContent, this.reward)
        .finally(() => {
          loading.dismiss();
        })
        .subscribe(
            (data) => {
            if(data.success == true) {
              if(this.is_max) {
                this.commonService.showToast('우수 참여자로 선정될 가능성이 높아졌어요!');
              }
              else {
                this.commonService.showToast('+ ' + this.reward + ' 포인트가 적립되었습니다.');
              }
              this.ModalWrapperPage.dismissModal("refresh");
            }
            else if(data.success == false) {
              this.commonService.apiRequestErrorHandler(data, this.navCtrl)
              .then(() => {
                this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
              });
            }
          },
          (err) => {
            console.log(err);
            this.commonService.showBasicAlert('오류가 발생했습니다.');
          }
        );

      }
    );
  }

  dismiss() {
    this.commonService.showConfirmAlert('취소하실 경우 현재까지 작성한 내용이 저장되지 않습니다. 그래도 취소하시겠습니까?', 
    () => {
      this.ModalWrapperPage.dismissModal("cancel");
    });
  }

  help() {
    if(this.isHelpHide) {
      this.isHelpHide = false;
      document.querySelector(".editor-modal .scroll-content")['style'].overflow = 'hidden';
    } else {
      this.isHelpHide = true;
      document.querySelector(".editor-modal .scroll-content")['style'].overflow = 'scroll';
    }
  }

  insertKeyword(keyword) {
    this.answerContent = this.answerContent + keyword;
  }

  openUserProjectStoryVerticalPage() {
    console.log('story open');
    this.ModalWrapperPage.unRegisterBackButtonCustomHandler();
    let userProjectStoryVerticalModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectStoryVerticalPage', params: { "project_id" : this.project_id }});
    userProjectStoryVerticalModal.present();
    userProjectStoryVerticalModal.onDidDismiss(() => {
      console.log('story close');
      this.initializeBackButtonCustomHandler();
    });

  }

  openUserProjectInterviewDetailPage() {
    console.log('detail open');
    this.ModalWrapperPage.unRegisterBackButtonCustomHandler();
    let userProjectInterviewDetailModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectInterviewDetailPage', params: { "project_participant_id" : this.project_participant_id }});
    userProjectInterviewDetailModal.present();
    userProjectInterviewDetailModal.onDidDismiss(() => {
      console.log('detail close');
      this.initializeBackButtonCustomHandler();
    });
  }

  textCount(text: string) {
    if(text == null) return 0;
    
    let temp: any;
    temp = text.replace(/<br *\/?>/gi, '');
    temp = temp.replace(/(?:\r\n|\r|\n|\s)/g, '');
    return temp.length;
  }

  textCountPercent(text: string) {
    let count = this.textCount(text)
    if(count <= this.maxTextLength ) {
      return (this.textCount(text) / this.maxTextLength) * 100;
    } else {
      return 100;
    }
  }

  countColor(count) {
    if(count < 20) { return "#4e4e4c" }
    else if(count < 30) { return "#7a3c8e" }
    else if(count < 40) { return "#23799d" }
    else if(count < 50) { return "#62941b" }
    else if(count < 100) { return "#f59926" }
    else { return "#ce522f" }
  }

  pointNotice(count) {
    if(count < 20) {return "20자 이상 입력해주세요!" }
    else if(count < 30) { return "더 많은 포인트를 향하여!" }
    else if(count < 40) { return "좋아요! 잘하고 있어요!" }
    else if(count < 50) { return "필력이 대단하네요!"}
    else if(count < 100) { return "당신의 정성에 감동했어요!" }
    else { return "훌륭해요! 더 이상 바랄게 없어요." } 
  }

  rewardPoint(count) {
    if(count < 20) { this.reward = 0; }
    else if(count < 50) { this.reward = (Math.floor(count/10))*100; }
    else { this.reward = 500; }
    return this.reward;
  }
}