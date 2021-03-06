import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectHomePage } from './user-project-home';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    UserProjectHomePage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(UserProjectHomePage),
  ],
})
export class UserProjectHomePageModule {}
