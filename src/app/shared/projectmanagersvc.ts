import { Injectable } from '@angular/core';
import {Userentity} from './userentity';
import {Taskentity} from './taskentity';
import {ProjectEntity} from './projectentity';
import {Parenttaskentity} from './parenttaskentity';
import {Http,Response, Headers, RequestOptions,RequestMethod} from '@angular/http';
import { Observable } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Injectable({
    providedIn: 'root'
  })

export class Projectmanagersvc {
    /**
     *
     */
selectedUser:Userentity;
selectedPro:ProjectEntity;
selectedTask:Taskentity;
selectedParentTask:Parenttaskentity;
constructor(private http:Http) { }
private headers = new Headers({'Content-Type' : 'application/json'});
getUsers() :Observable<any>  {
return this.http.get('http://localhost:49728/api/Users');
}
SaveUser(userID:Number, usr:Userentity){
var body = JSON.stringify(usr);
var headerOptions = new 
Headers({'Content-Type' : 'application/json'});
var requestOptions = new 
RequestOptions({method:RequestMethod.Put,headers:headerOptions});
return this.http.put
('http://localhost:49728/api/Users/'+userID, 
body, requestOptions).map(x=>x.json());
}
addUser(usr:Userentity){
var body = JSON.stringify(usr);
var headerOptions = new 
Headers({'Content-Type' : 'application/json'});
var requestOptions = new 
RequestOptions({method:RequestMethod.Post, headers:headerOptions});
 return this.http.post('http://localhost:49728/api/Users', 
 body, requestOptions).map(x=>x.json());
 }
deleteUser(usrID:Number){
return this.http.delete('http://localhost:49728/api/Users/' 
+ usrID).map(x=>x.json());
}
getProjects() :Observable<any>  {
return this.http.get('http://localhost:49728/api/Projects');
}
SaveProject(projID:Number, project:ProjectEntity){
var body = JSON.stringify(project);
var headerOptions = new 
Headers({'Content-Type' : 'application/json'});
var requestOptions = new 
RequestOptions({method:RequestMethod.Put,headers:headerOptions});
 return this.http.put
('http://localhost:49728/api/Projects/'+projID, 
 body, requestOptions).map(x=>x.json());
 }
   addProject(proj:ProjectEntity){
var body = JSON.stringify(proj);
var headerOptions = new Headers({'Content-Type' : 'application/json'});
var requestOptions = new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
return this.http.post('http://localhost:49728/api/Projects', body, requestOptions).map(x=>x.json());
}
deleteProject(projID:Number){
return this.http.delete('http://localhost:49728/api/Projects/' + 
projID).map(x=>x.json());
}
getTasks() :Observable<any>  {
  return this.http.get('http://localhost:49728/api/Tasks');
  }
  getParentTasks() :Observable<any>  {
    return this.http.get('http://localhost:49728/api/ParentTasks');
    }
addTask(task:Taskentity){
  var body = JSON.stringify(task);
  var headerOptions = new Headers({'Content-Type' : 'application/json'});
  var requestOptions = new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
  return this.http.post('http://localhost:49728/api/Tasks', body, requestOptions).map(x=>x.json());
  }
  addParentTask(parentTask:Parenttaskentity){
    var body = JSON.stringify(parentTask);
    var headerOptions = new Headers({'Content-Type' : 'application/json'});
    var requestOptions = new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
    return this.http.post('http://localhost:49728/api/ParentTasks', body, requestOptions).map(x=>x.json());
    }
    SaveTask(TaskID:Number, task:Taskentity){
      var body = JSON.stringify(task);
      var headerOptions = new 
      Headers({'Content-Type' : 'application/json'});
      var requestOptions = new 
      RequestOptions({method:RequestMethod.Put,headers:headerOptions});
      return this.http.put
      ('http://localhost:49728/api/Tasks/'+TaskID, 
      body, requestOptions).map(x=>x.json());
      }                
}
