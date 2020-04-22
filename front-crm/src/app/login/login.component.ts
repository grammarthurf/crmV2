import { Usuario } from './usuario';
import { CrudService } from './../services/crud.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = { username: '', password: '' };

  private usuario: Usuario;

  public token: any;

  loading: boolean;

  public coinsConfig: object;
  public lottieConfig: object;
  private anim: any;
  private anim2: any;


  constructor(private userservice: UserService, private route: ActivatedRoute, private router: Router, private crudservice: CrudService) {
    this.coinsConfig = {
      path: 'assets/loadingcoins.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
    this.lottieConfig = {
      path: 'assets/loading3points.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };

  }

  handleAnimation2(anim: any) {
    this.anim2 = anim;
  }

  handleAnimation(anim: any, anim2: any) {
    this.anim = anim;
  }

  stop() {
    this.anim.stop();
  }

  play() {
    this.anim.play();
    this.anim2.play();
  }

  pause() {
    this.anim.pause();
  }

  login() {
    this.crudservice.login(this.user).subscribe(res => {
      // this.cookies.set('token', JSON.stringify(res['token']) )
      // console.log('COOKIEEEE: ' , this.cookies.get('token'));
      console.log(res['token']);

      localStorage.setItem('token', JSON.stringify(res['token']));
      localStorage.setItem('username', JSON.stringify(this.user.username));


      this.loading = true;

      setTimeout(()=>{this.router.navigate(['/business']); this.userservice.show();}, 3900 )


    }, error => {
      swal({
        icon: "error",
        text: "Usuário ou Senha incorretos!",
        timer: 1300,
        buttons: {
          buttons: false
        }
      });
      console.log(error);
    });
  }

  setUser() {
    this.crudservice.getUsers().subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);

    });
  }

  ngOnInit() {
    this.userservice.hide();
  }

}
