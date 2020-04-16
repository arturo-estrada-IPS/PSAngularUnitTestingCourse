import { HeroesComponent } from "./heroes.component";
import { Hero } from "../hero";
// tslint:disable-next-line: import-blacklist
import { of } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroService } from "../hero.service";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";
import { Directive, Input } from "@angular/core";

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "[routerLink]",
  // tslint:disable-next-line: use-host-property-decorator
  host: { "(click)": "onClick()" },
})
// tslint:disable-next-line: directive-class-suffix
class RouterLinkDirectiveStub {
  @Input("routerLink") linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe("HeroesComponent", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;
  let HEROES: Hero[];
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "Test 1", strength: 8 },
      { id: 2, name: "Test 2", strength: 24 },
      { id: 1, name: "Test 3", strength: 10 },
    ];

    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    });

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  describe("delete", () => {
    beforeEach(() => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[2]);
    });

    it("should delete the indicated hero from the list", () => {
      expect(component.heroes.length).toBe(2);
    });

    it("should call deleteHero method from HeroService", () => {
      expect(mockHeroService.deleteHero).toHaveBeenCalled();
    });

    it("should call delete method when delete button is clicked with the correct parameter", () => {
      spyOn(component, "delete");
      mockHeroService.getHeroes.and.returnValue(of(HEROES));

      fixture.detectChanges();

      const children = fixture.debugElement.queryAll(
        By.directive(HeroComponent)
      );
      children[0]
        .query(By.css("button"))
        .triggerEventHandler("click", { stopPropagation: () => {} });

      expect(component.delete).toHaveBeenCalled();
      expect(component.delete).toHaveBeenCalledWith(HEROES[0]);
    });
  });

  describe("getHeroes", () => {
    beforeEach(() => {
      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      component.getHeroes();
    });

    it("should fill hero list using service", () => {
      fixture.detectChanges();
      expect(component.heroes).toBeDefined();
      expect(component.heroes.length).toBe(3);
    });

    it("should call getHeroes (from service)", () => {
      fixture.detectChanges();
      expect(mockHeroService.getHeroes).toHaveBeenCalled();
    });

    it("should create on li for each hero", () => {
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css("li")).length).toBe(3);
    });

    it("should create an instance of HeroComponent for each hero", () => {
      fixture.detectChanges();
      const fixtures = fixture.debugElement.queryAll(
        By.directive(HeroComponent)
      );
      expect(fixtures.length).toEqual(HEROES.length);
      for (let i = 0; i < fixtures.length; i++) {
        expect(fixtures[i].componentInstance.hero).toEqual(HEROES[i]);
      }
    });

    it("should have the correct route for the first hero", () => {
      fixture.detectChanges();
      const components = fixture.debugElement.queryAll(
        By.directive(HeroComponent)
      );

      const routerLink = components[0]
        .query(By.directive(RouterLinkDirectiveStub))
        .injector.get(RouterLinkDirectiveStub);

      components[0].query(By.css("a")).triggerEventHandler("click", null);

      expect(routerLink.navigatedTo).toBe("/detail/1");
    });
  });

  describe("add", () => {
    it("should add a new hero to the hero list when the add button is clicked", () => {
      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      fixture.detectChanges();

      const name = "A New Hero";
      const mockResponse = { id: 4, name, strength: 11 };
      const inputElement = fixture.debugElement.query(By.css("input"))
        .nativeElement;
      const addButton = fixture.debugElement.queryAll(By.css("button"))[0];

      mockHeroService.addHero.and.returnValue(of(mockResponse));
      inputElement.value = name;
      addButton.triggerEventHandler("click", null);
      fixture.detectChanges();

      expect(component.heroes.length).toBe(4);
    });
  });
});
