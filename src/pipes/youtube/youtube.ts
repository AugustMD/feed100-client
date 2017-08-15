import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the YoutubePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'youtube',
})
export class YoutubePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor(private dom: DomSanitizer) {

  }
  transform(value: string, ...args) {
    console.log(value);
    return this.dom.bypassSecurityTrustResourceUrl(value);
  }
}