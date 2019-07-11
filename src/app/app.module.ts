import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { YcalendarComponent } from './ycalendar/ycalendar.component';
import { ProgressBarComponent } from './component/progress-bar/progress-bar.component';
import { ProgressSpinnerComponent } from './component/progress-spinner/progress-spinner.component';
import { AppMaterialModule } from './app-material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MedicComponent } from './modal/medic/medic.component';
import { SurveyComponent } from './modal/survey/survey.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    YcalendarComponent,
    ProgressBarComponent,
    ProgressSpinnerComponent,
    SurveyComponent,
    MedicComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  entryComponents: [
    SurveyComponent,
    MedicComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
