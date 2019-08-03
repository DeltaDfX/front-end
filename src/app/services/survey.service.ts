import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantService} from '../constant/constant-service';
import {GroupStakeholder} from '../model/group-stakeholder';
import {Survey} from '../model/survey';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {SurveyStakeholder} from '../model/survey-stakeholder';
import {Stakeholder} from '../model/stakeholder';
import {forEach} from '@angular/router/src/utils/collection';
import {Receiver, SendSurveyObject} from '../JsonModel/send-survey-object';
import {SurveyDetails} from '../model/survey-details';
import {GroupStakeholderIssues} from '../JsonModel/group-stakeholder-issues';
import {TopBottomIssues} from '../JsonModel/top-bottom-issues';

@Injectable({
    providedIn: 'root'
})
export class SurveyService {

    constructor(private http: HttpClient,
                private constantService: ConstantService) {
    }

    sendSurveyToSelectedGroup(survey: Survey, receivers: Stakeholder[]): Observable<boolean> {
        const receiversJSON: {
            id: number
        }[] = [];
        receivers.forEach(receiver => {
            const receiverID: Receiver = {
                id: receiver.id
            };
            receiversJSON.push(receiverID);
        });
        const sender: Stakeholder = JSON.parse(localStorage.getItem('currentUser'));
        const objectToSend = new SendSurveyObject(sender.id, survey.id, receiversJSON);
        return this.http.post<boolean>(this.constantService.SEND_SURVEY_MAIL, objectToSend).pipe(
            tap(_ => console.log(`Send survey to list stakeholders`)),
            catchError(this.handleError<boolean>(`Post list stakeholders to send email`))
        );
    }

    getSurvey(surveyID: number, companyName: string): Observable<SurveyDetails> {
        const json = {
            surveyID,
            companyName
        };
        return this.http.post<SurveyDetails>(this.constantService.GET_SURVEY, json).pipe(
            tap(_ => console.log(`Get survey`)),
            catchError(this.handleError<SurveyDetails>(`Get survey`))
        );
    }

    sendSurveyResult(surveyDetails: SurveyDetails, receiver: number, sender: number): Observable<boolean> {
        const json = {
            surveyID: surveyDetails.id,
            receiver,
            issues: surveyDetails.issues,
            sender
        };
        return this.http.post<boolean>(this.constantService.SEND_SURVEY, json).pipe(
            tap(_ => console.log(`Send survey`)),
            catchError(this.handleError<boolean>(`Send survey`))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    getTopBottomIssue(groupIDs: number[], quantity: number): Observable<TopBottomIssues> {
        return this.http.get<TopBottomIssues>(this.constantService.GET_LIST_ISSUE_TOPBOTTOM + `groupID=${groupIDs}` + `&quantity=${quantity}`).pipe(
            tap(_ => console.log(`Get list top bottom issue`)),
            catchError(this.handleError<TopBottomIssues>(`Get list top bottom issue`))
        );
    }

    getIssuesOfGroups(groupIDs: number[], quantity: number): Observable<any> {
        return this.http.get<any>(this.constantService.GET_ISSUES_BY_GROUP + `groupID=${groupIDs} + &quantity=${quantity}`).pipe(
            tap(_ => console.log(`Get issues by group`)),
            catchError(this.handleError<any>(`Get issues by group`))
        );
    }

    getIssues(groupIDs: number[], quantity: number): Observable<any> {
        return this.http.get<any>(this.constantService.GET_ISSUES + `groupID=${groupIDs} + &quantity=${quantity}`).pipe(
            tap(_ => console.log(`Get issues by group`)),
            catchError(this.handleError<any>(`Get issues by group`))
        );
    }
}