import { Component, OnInit } from '@angular/core';
import { faGithub, faMarkdown } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  icons = {
    // brands
    github: faGithub,
    markdown: faMarkdown
  };

  constructor() {}

  ngOnInit() {}
}
