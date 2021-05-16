import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DailyPlannerComponent } from './components/daily-planner/daily-planner.component';
import { ResultDialogComponent } from './components/daily-planner/result-dialog/result-dialog.component';
import { FormsModule } from '@angular/forms';
import { AddCollabDialogComponent } from './components/daily-planner/add-collab-dialog/add-collab-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DailyPlannerComponent,
    ResultDialogComponent,
    AddCollabDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
