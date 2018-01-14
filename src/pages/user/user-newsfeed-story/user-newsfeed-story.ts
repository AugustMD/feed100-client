import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, App } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
/**
 * Generated class for the UserNewsfeedStoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-newsfeed-story',
  templateUrl: 'user-newsfeed-story.html',
})
export class UserNewsfeedStoryPage {
  @ViewChild(Slides) slides: Slides;
  newsfeed_id;
  bgHori:   number = 0 ; 
  lastBgH:  number = 0 ;
  mobWidth: number = 0 ;

  scrollHori:   number = 0 ;
  lastScrollH:  number = 0 ;
  transparentPercent: number = 0;

  isFirstSlide: boolean = true;
  isLastSlide: boolean = false;
  currentPageNum: number = 0;
  totalPageNum: number = 0;
  progressPercent: number = 0;
  
  isLike: boolean = false;
  newsfeedMainImage: String = "";
  avatarImage: String = "";
  nickname: String = "";
  newsfeedName: String = "";
  newsfeedSource: String = "";
  newsfeedViewNum: number = 0;
  newsfeedLikeNum: number = 0;
  newsfeedCommentNum: number = 0;
  newsfeedSummary: String = ""
  newsfeedRegistrationDate: String = "";
  
  newsfeedStorySlides = [];
  newsfeedComments = [];

  newsfeedComment: String = "";

  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public keyboard: Keyboard) {
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserNewsfeedStoryPage');
    this.commonService.isLoadingActive = true;
    this.newsfeed_id = this.navParams.get('newsfeed_id');
    this.slides.lockSwipeToPrev(true);  
  }
    
  ionViewWillEnter() {
    console.log('ionViewWillEnter UserNewsfeedStoryPage');
    let loading = this.commonService.presentLoading();

    this.userService.getNewsfeed(this.newsfeed_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.isLike = (data.data.isLike == 1) ? true : false;
          this.newsfeedMainImage = data.data.newsfeed_main_image;
          this.avatarImage = data.data.newsfeed_avatar_image;
          this.nickname = data.data.newsfeed_nickname;
          this.newsfeedName = data.data.newsfeed_name;
          this.newsfeedSource = data.data.newsfeed_source;
          this.newsfeedViewNum = data.data.newsfeed_view_num;
          this.newsfeedLikeNum = data.data.newsfeed_like_num;
          this.newsfeedCommentNum = data.data.newsfeed_comment_num;
          this.newsfeedSummary = data.data.newsfeed_summary;
          this.newsfeedRegistrationDate = data.data.newsfeed_registration_date;
          this.newsfeedStorySlides = JSON.parse(data.data.newsfeed_story);
          this.newsfeedComments = data.data.newsfeed_comments;

          this.totalPageNum = this.newsfeedStorySlides.length;
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewWillEnter();
          });
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );
  }

  back() {
    this.keyboard.disableScroll(true); // 추가
    this.navCtrl.pop();
  }

  slideChanged() {
    if(this.slides.isBeginning()) {
      this.slides.lockSwipeToPrev(true);  // 추가
      document.querySelector(".story-slide .slides")['style'].marginLeft = '16px'; // 추가
      this.isFirstSlide = true; 
    } else {
      this.slides.lockSwipeToPrev(false);  // 추가
      document.querySelector(".story-slide .slides")['style'].marginLeft = '0'; // 추가
      document.querySelector(".story-slide .slides")['style'].transitionProperty = 'margin-left'; // 추가
      document.querySelector(".story-slide .slides")['style'].transitionDuration = '0.4s'; // 추가
      this.isFirstSlide = false;
    }

    if (this.slides.isEnd()) {
      this.isLastSlide = true;
      this.keyboard.disableScroll(false); // 추가
    } else {
      this.isLastSlide = false;
      this.keyboard.disableScroll(true); // 추가
    }

    if(this.slides.getActiveIndex() > this.totalPageNum) {
      this.currentPageNum = this.totalPageNum;  
    } else {
      this.currentPageNum = this.slides.getActiveIndex();
    }
    this.progressPercent = 100 * ( this.currentPageNum / (this.totalPageNum) );
  }

  slideToComment() {
    this.slides.slideTo(this.newsfeedStorySlides.length + 1);
  }

  clickLike() {
    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();

    this.userService.newsfeedLike(this.newsfeed_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.isLike = (data.data.isLike == 1) ? true : false;
          this.newsfeedLikeNum = data.data.newsfeed_like_num;
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.commonService.showBasicAlert('잠시 후 다시 시도해주세요');            
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  goNextSlide() {
    this.slides.slideNext(500);
  }

  goFirstSlide() {
    this.slides.slideTo(0);
  }

  writeNewsfeedComment() {
    if(this.newsfeedComment != '') {
      this.commonService.isLoadingActive = true;
      let loading = this.commonService.presentLoading();
      let newsfeed_comment_content = this.newsfeedComment;
      this.newsfeedComment = '';
      this.newsfeedComments = [];
      
      this.userService.writeNewsfeedComment(this.newsfeed_id, newsfeed_comment_content)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
        (data) => {
          if(data.success == true) {
            this.newsfeedComments = data.data.newsfeed_comments;
            this.newsfeedCommentNum = data.data.newsfeed_comment_num;
            this.commonService.showBasicAlert('댓글이 등록되었습니다.');
          }
          else if(data.success == false) {
            this.commonService.apiRequestErrorHandler(data, this.navCtrl)
            .then(() => {
              this.commonService.showBasicAlert('잠시 후 다시 시도해주세요');
            })
          }
        },
        (err) => {
          console.log(err);
          this.commonService.showBasicAlert('오류가 발생했습니다.');
        }
      );
    }
  }

}
