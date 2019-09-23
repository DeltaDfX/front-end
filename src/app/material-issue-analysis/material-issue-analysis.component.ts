import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../services/navbar.service';

export enum ContentOfView {
  LocationAndIndustry = 'Location And Industry',
  StakeholderIssues = 'Stakeholder Issues',
  MaterialIssueMatrix = 'Material Issues Matrix',
  DataDetailsandVariables = 'Data Details and Variables'
}

@Component({
  selector: 'app-material-issue-analysis',
  templateUrl: './material-issue-analysis.component.html',
  styleUrls: ['./material-issue-analysis.component.scss']
})
export class MaterialIssueAnalysisComponent implements OnInit {
  contentOfView: ContentOfView;
  view = ContentOfView;

  constructor(private nav: NavbarService) {
    nav.show();
  }

  ngOnInit() {
  }

  sideBarClicked(contentOfView: ContentOfView) {
    this.contentOfView = contentOfView;
  }
}