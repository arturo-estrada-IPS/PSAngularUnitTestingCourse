import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
// tslint:disable-next-line: import-blacklist
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";
import { Location } from "@angular/common";

describe("HeroDetailComponent", () => {
  let mockActivatedRoute, mockHeroService, mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let component: HeroDetailComponent;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
    mockLocation = jasmine.createSpyObj(["back"]);
    mockActivatedRoute = { snapshot: { paramMap: { get: () => "3" } } };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
      ],
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;

    mockHeroService.getHero.and.returnValue(
      of({ id: 3, name: "HeroName", strength: 14 })
    );
  });

  it("should render the hero name in an h2 tag", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("h2").textContent).toContain(
      "HERONAME"
    );
  });
});
