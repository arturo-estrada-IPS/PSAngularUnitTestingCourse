import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("HeroComponent (shallow tests)", () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroComponent);

    fixture.componentInstance.hero = { id: 1, name: "Some Name", strength: 5 };
  });

  it("should have the correct hero", () => {
    expect(fixture.componentInstance.hero.name).toEqual("Some Name");
  });

  it("should render hero name in an anchor tag", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("a").textContent).toContain(
      "Some Name"
    );
  });
});
