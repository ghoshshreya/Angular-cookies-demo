import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  public cookie = null;
  public testData = {
    "email": "john.doe@example.com",
    "sessionId": "abcd1234"
  };

  public cookieData = {};

  ngOnInit() {
    this.fetchCookie();
  }

  /*--------METHOD TO SET THE COOKIE DATA-------*/
  public setCookie() {
    //SETTING EXPIRY DATE OF THE COOKIE
    var expires = "";
    let days = 2; 
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
    
    document.cookie = "sessionData" + "=" + (JSON.stringify(this.testData) || "")  + expires + "; path=/";

    this.fetchCookie();
  }

  public fetchCookie() {
    let _cookie = this.getCookie();
    console.error("Fetching Cookie :: ",_cookie);
    this.cookieData = {};
    if(undefined != _cookie)
    {
      this.cookieData = JSON.parse(_cookie);
    }
  }

  /*--------METHOD TO GET THE COOKIE DATA-------*/
  public getCookie() {
      var cookieData = "sessionData" + "=";
      console.error(document.cookie);
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(cookieData) == 0) return c.substring(cookieData.length,c.length);
      }
      return null;
  }

  /*--------METHOD TO REMOVE THE COOKIE DATA-------*/
  public removeCookie() { 
    document.cookie = "sessionData"+'=; Max-Age=-99999999;';  
    this.fetchCookie();
  }
}
