
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ModalWrapperPageModule } from '../pages/common/modal-wrapper/modal-wrapper.module';

// common //
import { LoginPageModule } from '../pages/common/login/login.module';
import { RegistrationPageModule } from '../pages/common/registration/registration.module';
import { UserLoginFormPageModule } from '../pages/common/user-login-form/user-login-form.module';
import { UserRegistrationFormPageModule } from '../pages/common/user-registration-form/user-registration-form.module';
import { UserSnsRegistrationFormPageModule } from '../pages/common/user-sns-registration-form/user-sns-registration-form.module';
import { CompanyLoginFormPageModule } from '../pages/common/company-login-form/company-login-form.module';
import { CompanyRegistrationFormPageModule } from '../pages/common/company-registration-form/company-registration-form.module';
import { AppIntroPageModule } from '../pages/common/app-intro/app-intro.module';
import { NoticePageModule } from '../pages/common/notice/notice.module';
import { PrivateInfoPolicyPageModule } from '../pages/common/private-info-policy/private-info-policy.module';
import { TermsPageModule } from '../pages/common/terms/terms.module';
// common //

// admin //
import { AdminConfigurePageModule } from './../pages/admin/admin-configure/admin-configure.module';
import { AdminTabsPageModule } from './../pages/admin/admin-tabs/admin-tabs.module';
  import { AdminProjectPageModule } from './../pages/admin/admin-project/admin-project.module';
    import { AdminAllProjectListPageModule } from './../pages/admin/admin-all-project-list/admin-all-project-list.module';
    import { AdminProjectHomePageModule } from './../pages/admin/admin-project-home/admin-project-home.module';
      import { AdminProjectStoryHorizontalPageModule } from './../pages/admin/admin-project-story-horizontal/admin-project-story-horizontal.module';
      import { AdminProjectReportPageModule } from './../pages/admin/admin-project-report/admin-project-report.module';
      import { AdminProjectInterviewDetailPageModule } from './../pages/admin/admin-project-interview-detail/admin-project-interview-detail.module';
      import { AdminProjectGroupInterviewPageModule } from './../pages/admin/admin-project-group-interview/admin-project-group-interview.module';
      import { AdminProjectGroupInterviewQuestionEditorPageModule } from './../pages/admin/admin-project-group-interview-question-editor/admin-project-group-interview-question-editor.module';
  import { AdminNotificationPageModule } from './../pages/admin/admin-notification/admin-notification.module';
  import { AdminMypagePageModule } from './../pages/admin/admin-mypage/admin-mypage.module';
// admin //

// company //
import { CompanyTutorialPageModule } from '../pages/company/company-tutorial/company-tutorial.module';
import { CompanyProjectRegistrationPageModule } from '../pages/company/company-project-registration/company-project-registration.module';
import { CompanyProjectHomePageModule } from '../pages/company/company-project-home/company-project-home.module';
  import { CompanyConfigurePageModule } from '../pages/company/company-configure/company-configure.module';
    import { CompanyHelpPageModule } from '../pages/company/company-help/company-help.module';
  import { CompanyNotificationPageModule } from '../pages/company/company-notification/company-notification.module';
  import { CompanyProjectStoryHorizontalPageModule } from '../pages/company/company-project-story-horizontal/company-project-story-horizontal.module';
  import { CompanyProjectReportPageModule } from '../pages/company/company-project-report/company-project-report.module';
  import { CompanyProjectInterviewDetailPageModule } from '../pages/company/company-project-interview-detail/company-project-interview-detail.module';
  import { CompanyProjectGroupInterviewPageModule } from '../pages/company/company-project-group-interview/company-project-group-interview.module';
    import { CompanyProjectGroupInterviewQuestionEditorPageModule } from '../pages/company/company-project-group-interview-question-editor/company-project-group-interview-question-editor.module';
// company //

// user //
import { UserConfigurePageModule } from '../pages/user/user-configure/user-configure.module';
  import { UserHelpPageModule } from '../pages/user/user-help/user-help.module';
  import { UserProfileModificationFormPageModule } from '../pages/user/user-profile-modification-form/user-profile-modification-form.module';
import { UserTutorialPageModule } from '../pages/user/user-tutorial/user-tutorial.module';
import { UserTabsPageModule } from '../pages/user/user-tabs/user-tabs.module'
  import { UserProjectPageModule } from '../pages/user/user-project/user-project.module';
    import { UserAllProjectListPageModule } from '../pages/user/user-all-project-list/user-all-project-list.module'
  import { UserProjectInterviewFormPageModule } from '../pages/user/user-project-interview-form/user-project-interview-form.module';
    import { UserProjectStoryHorizontalPageModule } from '../pages/user/user-project-story-horizontal/user-project-story-horizontal.module';
    import { UserProjectParticipationConditionFormPageModule } from '../pages/user/user-project-participation-condition-form/user-project-participation-condition-form.module';
    import { UserProjectRewardFormPageModule } from '../pages/user/user-project-reward-form/user-project-reward-form.module';
    import { UserProjectStoryQuizFormPageModule } from '../pages/user/user-project-story-quiz-form/user-project-story-quiz-form.module';    
    import { UserProjectHomePageModule } from '../pages/user/user-project-home/user-project-home.module';
      import { UserProjectInterviewAnswerPageModule } from '../pages/user/user-project-interview-answer/user-project-interview-answer.module';
        import { UserProjectInterviewDetailPageModule } from '../pages/user/user-project-interview-detail/user-project-interview-detail.module';
        import { UserProjectStoryVerticalPageModule } from '../pages/user/user-project-story-vertical/user-project-story-vertical.module';
  import { UserNotificationPageModule } from '../pages/user/user-notification/user-notification.module';
  import { UserMypagePageModule } from '../pages/user/user-mypage/user-mypage.module';
    import { UserPointExchangePageModule } from '../pages/user/user-point-exchange/user-point-exchange.module';
    import { UserPointUsageHistoryPageModule } from '../pages/user/user-point-usage-history/user-point-usage-history.module';  
// user //

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Device } from '@ionic-native/device';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Badge } from '@ionic-native/badge';
import { CommonServiceProvider } from '../providers/common-service/common-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { CompanyServiceProvider } from '../providers/company-service/company-service';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { Keyboard } from '@ionic-native/keyboard';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { EmailComposer } from '@ionic-native/email-composer';
import { AppVersion } from '@ionic-native/app-version';
import { Market } from '@ionic-native/market';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
// import { UserProjectStoryQuizPage } from '../pages/user/user-project-story-quiz/user-project-story-quiz';
import { AdminServiceProvider } from '../providers/admin-service/admin-service';

export class MyHammerConfig extends HammerGestureConfig  {
  // swipedown 값을 알아내는 함수
  overrides = <any>{
      // override hammerjs default configuration
      'pan': {threshold: 5},
      'swipe': {
           velocity: 0.4,
           threshold: 20,
           direction: 31 // /!\ ugly hack to allow swipe in all direction
      }
  }
}

@NgModule({
  declarations: [MyApp],
  imports: [
    ModalWrapperPageModule,

    LoginPageModule,
      RegistrationPageModule,
      UserLoginFormPageModule,
      UserRegistrationFormPageModule,
      UserSnsRegistrationFormPageModule,
      CompanyLoginFormPageModule,
      CompanyRegistrationFormPageModule,
    AppIntroPageModule,
    NoticePageModule,
    PrivateInfoPolicyPageModule,
    TermsPageModule,
 
    AdminConfigurePageModule,
    AdminTabsPageModule,
      AdminProjectPageModule,
        AdminAllProjectListPageModule,
        AdminProjectHomePageModule,
          AdminProjectStoryHorizontalPageModule,
          AdminProjectReportPageModule,
          AdminProjectInterviewDetailPageModule,
          AdminProjectGroupInterviewPageModule,
            AdminProjectGroupInterviewQuestionEditorPageModule,
      AdminNotificationPageModule,
      AdminMypagePageModule,

    CompanyTutorialPageModule,
    CompanyProjectRegistrationPageModule,
    CompanyProjectHomePageModule,
      CompanyConfigurePageModule,
        CompanyHelpPageModule,
      CompanyNotificationPageModule,
      CompanyProjectStoryHorizontalPageModule,
      CompanyProjectReportPageModule,
      CompanyProjectInterviewDetailPageModule,
      CompanyProjectGroupInterviewPageModule,
        CompanyProjectGroupInterviewQuestionEditorPageModule,
    
    UserConfigurePageModule,
      UserHelpPageModule,
      UserProfileModificationFormPageModule,
    UserTutorialPageModule,
    UserTabsPageModule,
      UserProjectPageModule,
        UserAllProjectListPageModule,
      UserProjectInterviewFormPageModule,
        UserProjectStoryHorizontalPageModule,
        UserProjectParticipationConditionFormPageModule,
        UserProjectRewardFormPageModule,
        UserProjectStoryQuizFormPageModule,
        UserProjectHomePageModule,
          UserProjectInterviewAnswerPageModule,
            UserProjectInterviewDetailPageModule,
            UserProjectStoryVerticalPageModule,
      UserNotificationPageModule,
      UserMypagePageModule,
        UserPointExchangePageModule,
        UserPointUsageHistoryPageModule,

    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp, {
        scrollPadding: false,
        scrollAssist: false,
        autoFocusAssist: false,
        swipeBackEnabled: true,
        tabsHideOnSubPages: true,
        modalEnter: 'modal-slide-in',
        modalLeave: 'modal-slide-out',
        pageTransition: 'ios-transition'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    GooglePlus,
    Push,
    Device,
    UniqueDeviceID,
    PhotoViewer,
    Camera,
    File,
    Badge,
    CommonServiceProvider,
    UserServiceProvider,
    CompanyServiceProvider,
    ThemeableBrowser,
    Keyboard,
    ScreenOrientation,
    EmailComposer,
    AppVersion,
    Market,
    OpenNativeSettings,
    {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    AdminServiceProvider
  ]
})
export class AppModule {}
