import { NgModule } from '@angular/core';
import { TextAvatarDirective } from './text-avatar/text-avatar';
import { ValidDirective } from './valid/valid';

@NgModule({
	declarations: [TextAvatarDirective,
    ValidDirective],
	imports: [],
	exports: [TextAvatarDirective,
    ValidDirective]
})
export class DirectivesModule {}
