import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(name: string) {
    // tslint:disable-next-line: object-literal-key-quotes
    this.router.navigate(['/recipe-list'], {queryParams: {'search': name}});
  }

}
