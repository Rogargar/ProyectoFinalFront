'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">finalproject-front documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-624ff8369d396066e9eeab12aadb5cd2"' : 'data-target="#xs-components-links-module-AppModule-624ff8369d396066e9eeab12aadb5cd2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-624ff8369d396066e9eeab12aadb5cd2"' :
                                            'id="xs-components-links-module-AppModule-624ff8369d396066e9eeab12aadb5cd2"' }>
                                            <li class="link">
                                                <a href="components/AddEditRecipeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddEditRecipeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LabelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LabelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PersonalDataComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PersonalDataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecipeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecipesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserRecipesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserRecipesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomValidators.html" data-type="entity-link">CustomValidators</a>
                            </li>
                            <li class="link">
                                <a href="classes/ElementModel.html" data-type="entity-link">ElementModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/LabelModel.html" data-type="entity-link">LabelModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/RecipeModel.html" data-type="entity-link">RecipeModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/RolModel.html" data-type="entity-link">RolModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SavedRecipeModel.html" data-type="entity-link">SavedRecipeModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserModel.html" data-type="entity-link">UserModel</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link">EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LabelService.html" data-type="entity-link">LabelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MapperService.html" data-type="entity-link">MapperService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecipeService.html" data-type="entity-link">RecipeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SavedRecipeService.html" data-type="entity-link">SavedRecipeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/CanActivateViaAuthGuard.html" data-type="entity-link">CanActivateViaAuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/UserInterface.html" data-type="entity-link">UserInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});