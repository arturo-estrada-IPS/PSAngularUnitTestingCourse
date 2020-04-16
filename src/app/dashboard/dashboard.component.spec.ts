import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardComponent } from "./dashboard.component";
import { Directive, Input, Component } from "@angular/core";
import { Hero } from "../hero";
// tslint:disable-next-line: import-blacklist
import { of } from "rxjs";
import { StrengthPipe } from "../strength/strength.pipe";
import { HeroService } from "../hero.service";

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "[routerLink]",
  // tslint:disable-next-line: use-host-property-decorator
  host: { "(click)": "onClick()" },
})
class StubRouterLinkDirective {
  @Input("routerLink") linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

@Component({
  selector: "app-hero-search",
  template: "<div></div>",
})
class MockHeroSearchComponent {}

describe("DashboardComponent", () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let mockHeroService;
  let HEROES: Hero[];

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(["getHeroes"]);
    HEROES = [
      { id: 1, name: "Test 1", strength: 5 },
      { id: 2, name: "Test 2", strength: 10 },
      { id: 3, name: "Test 3", strength: 15 },
    ];

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        StubRouterLinkDirective,
        StrengthPipe,
        MockHeroSearchComponent,
      ],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
  });

  it("should create component", () => {
    expect(component).toBeDefined();
  });

  it("should perform initial load", () => {
    fixture.detectChanges();
    expect(component.heroes.length).toBeGreaterThan(0);
  });
});
