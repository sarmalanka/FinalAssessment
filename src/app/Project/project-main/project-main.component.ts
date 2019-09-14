import { Component, OnInit,Pipe,PipeTransform,Injectable } from '@angular/core';
import {Projectmanagersvc} from './../../shared/projectmanagersvc';
import { NgModule } from '@angular/core';
import { ProjectEntity } from '../../shared/projectentity';
import { Observable } from 'rxjs';
import {Http,Response, Headers, RequestOptions,RequestMethod} from '@angular/http';
import { map, filter, scan } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { debug } from 'util';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {ProjSearchPipe} from '../../shared/proj-search.pipe';
import {formatDate} from '@angular/common'

@Component({
  selector: 'app-project-main',
  templateUrl: './project-main.component.html',
  styleUrls: ['./project-main.component.css'],
  providers: [Projectmanagersvc]
})
export class ProjectMainComponent implements OnInit {
projectList:ProjectEntity[];
proj:ProjectEntity;
  constructor(private projectmgrsvc:Projectmanagersvc) { }

  ngOnInit() {
    this.projectmgrsvc.getProjects().subscribe(rs => {
      this.projectList = rs.json() as ProjectEntity[];
      }
    );
    this.proj={
      ProjectID:null,
      ProjectTitle:'',
      Completed:null,
      TotalTasks:null,
      editmode:true,
      CompletedTasks:null,
      StartDate:null,
      EndDate:null,
      savetype:'Add',
      Priority:0,
        ManagerName:'',
        ManagerID:null
  }
  }
    onresetClick(){
      this.proj={
        ProjectID:null,
        ProjectTitle:'',
        Completed:null,
        TotalTasks:null,
        editmode:true,
        CompletedTasks:null,
        StartDate:null,
        EndDate:null,
        savetype:'Add',
        Priority:0,
        ManagerName:'',
        ManagerID:null
    }
    }
    SDAsc(){
      this.projectList.sort((val1, val2)=> 
      {return <any>new Date(val1.StartDate) - <any>new 
        Date(val2.StartDate)});
    }
    SDDesc(){
      this.projectList.sort((val1, val2)=> 
      {return <any>new Date(val2.StartDate) - <any>new 
        Date(val1.StartDate)});
    }
    EDAsc(){
      this.projectList.sort((val1, val2)=> 
      {return <any>new Date(val1.EndDate) - <any>new 
        Date(val2.EndDate)});
    }
    EDDesc(){
      this.projectList.sort((val1, val2)=> 
      {return <any>new Date(val2.EndDate) - <any>new 
        Date(val1.EndDate)});
    }
    PAsc(){
      this.projectList.sort((a,b) =>a.Priority - b.Priority);
    }
    PDesc(){
      this.projectList.sort((a,b) => b.Priority - a.Priority);
    }
    CAsc(){
      this.projectList.sort((a,b) =>a.CompletedTasks - b.CompletedTasks);
    }
    CDesc(){
      this.projectList.sort((a,b) => b.CompletedTasks - a.CompletedTasks);
    }
    onProjectSave(proj:ProjectEntity){
      if(proj.savetype=='Add')
      {
        this.projectmgrsvc.addProject(proj)
      .subscribe(data => {
      });
      }
      else
      {
        if(proj.ManagerName!=''&&proj.ManagerID==null){
          alert('Cannot proceed. Manager Name incorrect');
          return;
        }
        this.projectmgrsvc.SaveProject(proj.ProjectID, proj)
    .subscribe(data => {console.log(proj); });
      }
      this.projectmgrsvc.getProjects().subscribe(rs => {
        return this.projectList = rs.json() as ProjectEntity[];
        }
      );
      this.projectmgrsvc.getProjects().subscribe(rs => {
        this.projectList = rs.json() as ProjectEntity[];
        }
      );
      this.ngOnInit();
    }
    ondeleteClick(projID:Number){
      this.projectmgrsvc.deleteProject(projID)
    .subscribe(data => { }); 
      this.projectmgrsvc.getUsers().subscribe(rs => {
        return this.projectList = rs.json() as ProjectEntity[];
        }
      );
      this.projectmgrsvc.getProjects().subscribe(rs => {
        this.projectList = rs.json() as ProjectEntity[];
        }
      );
      this.ngOnInit();
    }
    onEdit(project:ProjectEntity){
      this.proj.ManagerID = 
      this.projectList.find(x=>x.ProjectID==project.ProjectID).ManagerID;
      this.proj = project;
    }
}
