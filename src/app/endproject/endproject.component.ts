import { Component, OnInit } from '@angular/core';
import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-endproject',
  templateUrl: './endproject.component.html',
  styleUrls: ['./endproject.component.css']
})
export class EndprojectComponent implements OnInit {

  constructor(private heroService: HeroService) { }

  ngOnInit() {
  }
  add(name: string,weapon:string): void {
    name = name.trim();
    weapon=weapon.trim();
    if (!name) { return; }
    this.heroService.addHero({ name,weapon } as Hero)
      .subscribe(hero => {
      });
  }
}
