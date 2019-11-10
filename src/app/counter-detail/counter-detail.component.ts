import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CounterService }  from '../counter.service';
import { Counter } from '../counter';

@Component({
  selector: 'app-counter-detail',
  templateUrl: './counter-detail.component.html',
  styleUrls: ['./counter-detail.component.css']
})
export class CounterDetailComponent implements OnInit {
  counter: Counter;

  constructor(
    private route: ActivatedRoute,
    private counterService: CounterService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getCounter();
  }

  getCounter() : void {
    this.route.params.subscribe(
      params => {
        this.counterService.getCounter(params['id'])
          .subscribe(counter => this.counter = counter);
      }
    );
  }

  async increment(){
    this.counter.value = await this.counterService.increment(this.counter.id);
  }
}
