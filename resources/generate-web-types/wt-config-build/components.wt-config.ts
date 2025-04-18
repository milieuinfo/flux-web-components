import { accordionArgTypes } from '../../../libs/components/src/accordion/stories/vl-accordion.stories-arg';
import { alertArgTypes } from '../../../libs/components/src/alert/stories/vl-alert.stories-arg';
import { autocompleteArgTypes } from '../../../libs/components/src/autocomplete/stories/vl-autocomplete.stories-arg';
import { breadcrumbItemArgTypes } from '../../../libs/components/src/breadcrumb/stories/vl-breadcrumb-item.stories-arg';
import { buttonArgTypes } from '../../../libs/components/src/button/stories/vl-button.stories-arg';
import { cascaderItemArgTypes } from '../../../libs/components/src/cascader/stories/vl-cascader-item.stories-arg';
import { cascaderArgTypes } from '../../../libs/components/src/cascader/stories/vl-cascader.stories-arg';
import { contentHeaderArgTypes } from '../../../libs/components/src/content-header/stories/vl-content-header.stories-arg';
import { descriptionDataItemArgTypes } from '../../../libs/components/src/description-data/stories/vl-description-data-item.stories-arg';
import { descriptionDataArgTypes } from '../../../libs/components/src/description-data/stories/vl-description-data.stories-arg';
import { documentArgTypes } from '../../../libs/components/src/document/stories/vl-document.stories-arg';
import { doormatArgTypes } from '../../../libs/components/src/doormat/stories/vl-doormat.stories-arg';
import { functionalHeaderArgTypes } from '../../../libs/components/src/functional-header/stories/vl-functional-header.stories-arg';
import { httpErrorMessageArgTypes } from '../../../libs/components/src/http-error-message/stories/vl-http-error-message.stories-arg';
import { iconArgTypes } from '../../../libs/components/src/icon/stories/vl-icon.stories-arg';
import { infoTileArgTypes } from '../../../libs/components/src/info-tile/stories/vl-info-tile.stories-arg';
import { infoblockArgTypes } from '../../../libs/components/src/infoblock/stories/vl-infoblock.stories-arg';
import { infotextArgTypes } from '../../../libs/components/src/infotext/stories/vl-infotext.stories-arg';
import { inputSliderArgTypes } from '../../../libs/components/src/input-slider/stories/vl-input-slider.stories-arg';
import { linkArgTypes } from '../../../libs/components/src/link/stories/vl-link.stories-arg';
import { loaderArgTypes } from '../../../libs/components/src/loader/stories/vl-loader.stories-arg';
import { modalArgTypes } from '../../../libs/components/src/modal/stories/vl-modal.stories-arg';
import { pagerArgTypes } from '../../../libs/components/src/pager/stories/vl-pager.stories-arg';
import { paragraphArgTypes } from '../../../libs/components/src/paragraph/stories/vl-paragraph.stories-arg';
import { buttonPillArgTypes } from '../../../libs/components/src/pill/stories/vl-button-pill.stories-arg';
import { pillArgTypes } from '../../../libs/components/src/pill/stories/vl-pill.stories-arg';
import { popoverArgTypes } from '../../../libs/components/src/popover/stories/vl-popover.stories-arg';
import { progressBarArgTypes } from '../../../libs/components/src/progress-bar/stories/vl-progress-bar.stories-arg';
import { propertiesArgTypes } from '../../../libs/components/src/properties/stories/vl-properties.stories-arg';
import { prozaMessagePreloaderArgTypes } from '../../../libs/components/src/proza-message/stories/vl-proza-message-preloader.stories-arg';
import { prozaMessageArgTypes } from '../../../libs/components/src/proza-message/stories/vl-proza-message.stories-arg';
import { richDataTableArgTypes } from '../../../libs/components/src/rich-data-table/stories/vl-rich-data-table.stories-arg';
import { richDataArgTypes } from '../../../libs/components/src/rich-data/stories/vl-rich-data.stories-arg';
import { searchFilterArgTypes } from '../../../libs/components/src/search-filter/stories/vl-search-filter.stories-arg';
import { searchResultArgTypes } from '../../../libs/components/src/search-result/stories/vl-search-result.stories-arg';
import { shareButtonArgTypes } from '../../../libs/components/src/share-buttons/stories/vl-share-button.stories-arg';
import { shareButtonsArgTypes } from '../../../libs/components/src/share-buttons/stories/vl-share-buttons.stories-arg';
import { sideSheetArgTypes } from '../../../libs/components/src/side-sheet/stories/vl-side-sheet.stories-arg';
import { spotlightArgTypes } from '../../../libs/components/src/spotlight/stories/vl-spotlight.stories-arg';
import { stepArgTypes } from '../../../libs/components/src/steps/stories/vl-step.stories-arg';
import { stepsArgTypes } from '../../../libs/components/src/steps/stories/vl-steps.stories-arg';
import { tableArgTypes } from '../../../libs/components/src/table/stories/vl-table.stories-arg';
import { tabsPaneArgTypes } from '../../../libs/components/src/tabs/stories/vl-tabs-pane.stories-arg';
import { tabsArgTypes } from '../../../libs/components/src/tabs/stories/vl-tabs.stories-arg';
import { templateArgTypes } from '../../../libs/components/src/template/stories/vl-template.stories-arg';
import { textArgTypes } from '../../../libs/components/src/text/stories/vl-text.stories-arg';
import { titleArgTypes } from '../../../libs/components/src/title/stories/vl-title.stories-arg';
import { toasterArgTypes } from '../../../libs/components/src/toaster/stories/vl-toaster.stories-arg';
import { typographyArgTypes } from '../../../libs/components/src/typography/stories/vl-typography.stories-arg';
import { videoPlayerArgTypes } from '../../../libs/components/src/video-player/stories/vl-video-player.stories-arg';
import { wizardPaneArgTypes } from '../../../libs/components/src/wizard/stories/vl-wizard-pane.stories-arg';
import { wizardArgTypes } from '../../../libs/components/src/wizard/stories/vl-wizard.stories-arg';
import { WTConfigArray } from '../web-types.model';
import { buildWTConfig } from './utils.wt-config';

export const buildWTConfigComponents: WTConfigArray = [
    buildWTConfig(
        'vl-accordion',
        accordionArgTypes,
        '../../libs/components/src/accordion/stories/vl-accordion.stories-doc.mdx',
        '/docs/components-accordion--documentatie'
    ),
    buildWTConfig(
        'vl-alert',
        alertArgTypes,
        '../../libs/components/src/alert/stories/vl-alert.stories-doc.mdx',
        '/docs/components-alert--documentatie'
    ),
    buildWTConfig(
        'vl-autocomplete',
        autocompleteArgTypes,
        '../../libs/components/src/autocomplete/stories/vl-autocomplete.stories-doc.mdx',
        '/docs/components-autocomplete--documentatie'
    ),
    buildWTConfig(
        'vl-breadcrumb',
        null,
        '../../libs/components/src/breadcrumb/stories/vl-breadcrumb.stories-doc.mdx',
        '/docs/components-breadcrumb--documentatie'
    ),
    buildWTConfig('vl-breadcrumb-item', breadcrumbItemArgTypes, null, '/docs/components-breadcrumb--documentatie'),
    buildWTConfig('vl-contact-card', null, null, '/docs/components-contact-card--documentatie'),
    buildWTConfig(
        'vl-content-header',
        contentHeaderArgTypes,
        '../../libs/components/src/content-header/stories/vl-content-header.stories-doc.mdx',
        '/docs/components-content-header--documentatie'
    ),
    buildWTConfig(
        'vl-description-data',
        descriptionDataArgTypes,
        null,
        '/docs/components-description-data-description-data--documentatie'
    ),
    buildWTConfig(
        'vl-description-data-item',
        descriptionDataItemArgTypes,
        null,
        '/docs/components-description-data-description-data-item--documentatie'
    ),
    buildWTConfig(
        'vl-document',
        documentArgTypes,
        '../../libs/components/src/document/stories/vl-document.stories-doc.mdx',
        '/docs/components-document--documentatie'
    ),
    buildWTConfig(
        'vl-functional-header',
        functionalHeaderArgTypes,
        '../../libs/components/src/functional-header/stories/vl-functional-header.stories-doc.mdx',
        '/docs/components-functional-header--documentatie'
    ),
    buildWTConfig(
        'vl-http-error-message',
        httpErrorMessageArgTypes,
        '../../libs/components/src/http-error-message/stories/vl-http-error-message.stories-doc.mdx',
        '/docs/components-http-error-message--documentatie'
    ),
    buildWTConfig(
        'vl-info-tile',
        infoTileArgTypes,
        '../../libs/components/src/info-tile/stories/vl-info-tile.stories-doc.mdx',
        '/docs/components-info-tile--documentatie'
    ),
    buildWTConfig('vl-infoblock', infoblockArgTypes, null, '/docs/components-infoblock--documentatie'),
    buildWTConfig(
        'vl-input-slider',
        inputSliderArgTypes,
        '../../libs/components/src/input-slider/stories/vl-input-slider.stories-doc.mdx',
        '/docs/components-input-slider--documentatie'
    ),
    buildWTConfig('vl-loader', loaderArgTypes, null, '/docs/components-loader--documentatie'),
    buildWTConfig('vl-modal', modalArgTypes, null, '/docs/components-modal--documentatie'),
    buildWTConfig(
        'vl-button',
        buttonArgTypes,
        '../../libs/components/src/button/stories/vl-button.stories-doc.mdx',
        '/docs/components-button--documentatie'
    ),
    buildWTConfig(
        'vl-cascader',
        cascaderArgTypes,
        '../../libs/components/src/cascader/stories/vl-cascader.stories-doc.mdx',
        '/docs/components-cascader-cascader--documentatie'
    ),
    buildWTConfig(
        'vl-cascader-item',
        cascaderItemArgTypes,
        null,
        '/docs/components-cascader-cascader-item--documentatie'
    ),
    buildWTConfig(
        'vl-table',
        tableArgTypes,
        '../../libs/components/src/table/stories/vl-table.stories-doc.mdx',
        '/docs/components-table--documentatie'
    ),
    buildWTConfig(
        'vl-doormat',
        doormatArgTypes,
        '../../libs/components/src/doormat/stories/vl-doormat.stories-doc.mdx',
        '/docs/components-doormat--documentatie'
    ),
    buildWTConfig(
        'vl-icon',
        iconArgTypes,
        '../../libs/components/src/icon/stories/vl-icon.stories-doc.mdx',
        '/docs/components-icon--documentatie'
    ),
    buildWTConfig(
        'vl-infotext',
        infotextArgTypes,
        '../../libs/components/src/infotext/stories/vl-infotext.stories-doc.mdx',
        '/docs/components-infotext--documentatie'
    ),
    buildWTConfig(
        'vl-link',
        linkArgTypes,
        '../../libs/components/src/link/stories/vl-link.stories-doc.mdx',
        '/docs/components-link--documentatie'
    ),
    buildWTConfig(
        'vl-paragraph',
        paragraphArgTypes,
        '../../libs/components/src/paragraph/stories/vl-paragraph.stories-doc.mdx',
        '/docs/components-paragraph--documentatie'
    ),
    buildWTConfig(
        'vl-properties',
        propertiesArgTypes,
        '../../libs/components/src/properties/stories/vl-properties.stories-doc.mdx',
        '/docs/components-properties--documentatie'
    ),
    buildWTConfig(
        'vl-search-result',
        searchResultArgTypes,
        '../../libs/components/src/search-result/stories/vl-search-result.stories-doc.mdx',
        '/docs/components-search-result--documentatie'
    ),
    buildWTConfig('vl-search-result-title', null, null, '/docs/components-search-result--documentatie'),
    buildWTConfig('vl-search-result-text', null, null, '/docs/components-search-result--documentatie'),
    buildWTConfig('vl-search-result-properties', null, null, '/docs/components-search-result--documentatie'),
    buildWTConfig(
        'vl-side-navigation',
        null,
        '../../libs/components/src/side-navigation/stories/vl-side-navigation.stories-doc.mdx',
        '/docs/components-side-navigation--documentatie'
    ),
    buildWTConfig('vl-side-navigation-content', null, null, '/docs/components-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-group', null, null, '/docs/components-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-item', null, null, '/docs/components-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-reference', null, null, '/docs/components-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-h1', null, null, '/docs/components-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-h2', null, null, '/docs/components-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-h3', null, null, '/docs/components-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-h4', null, null, '/docs/components-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-h5', null, null, '/docs/components-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-h6', null, null, '/docs/components-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-toggle', null, null, '/docs/components-side-navigation--documentatie'),
    buildWTConfig(
        'vl-search-filter',
        searchFilterArgTypes,
        '../../libs/components/src/search-filter/stories/vl-search-filter.stories-doc.mdx',
        '/docs/components-search-filter--documentatie'
    ),
    buildWTConfig(
        'vl-steps',
        stepsArgTypes,
        '../../libs/components/src/steps/stories/vl-steps.stories-doc.mdx',
        '/docs/components-steps-steps--documentatie'
    ),
    buildWTConfig('vl-step', stepArgTypes, null, '/docs/components-steps-step--documentatie'),
    buildWTConfig('vl-duration-step', null, null, '/docs/components-steps-steps--documentatie'),
    buildWTConfig(
        'vl-text',
        textArgTypes,
        '../../libs/components/src/text/stories/vl-text.stories-doc.mdx',
        '/docs/components-text-text--documentatie'
    ),
    buildWTConfig(
        'vl-title',
        titleArgTypes,
        '../../libs/components/src/title/stories/vl-title.stories-doc.mdx',
        '/docs/components-title--documentatie'
    ),
    buildWTConfig('vl-pager', pagerArgTypes, null, '/docs/components-pager--documentatie'),
    buildWTConfig('vl-pill', pillArgTypes, null, '/docs/components-pill-pill--documentatie'),
    buildWTConfig('vl-button-pill', buttonPillArgTypes, null, '/docs/components-pill-button-pill--documentatie'),
    buildWTConfig(
        'vl-popover',
        popoverArgTypes,
        '../../libs/components/src/popover/stories/vl-popover.stories-doc.mdx',
        '/docs/components-popover--documentatie'
    ),
    buildWTConfig('vl-popover-action', null, null, '/docs/components-popover--documentatie'),
    buildWTConfig('vl-popover-action-list', null, null, '/docs/components-popover--documentatie'),
    buildWTConfig(
        'vl-progress-bar',
        progressBarArgTypes,
        '../../libs/components/src/progress-bar/stories/vl-progress-bar.stories-doc.mdx',
        '/docs/components-progress-bar--documentatie'
    ),
    buildWTConfig(
        'vl-proza-message',
        prozaMessageArgTypes,
        '../../libs/components/src/proza-message/stories/vl-proza-message.stories-doc.mdx',
        '/docs/components-proza-message--documentatie'
    ),
    buildWTConfig(
        'vl-proza-message-preloader',
        prozaMessagePreloaderArgTypes,
        '../../libs/components/src/proza-message/stories/vl-proza-message-preloader.stories-doc.mdx',
        '/docs/components-proza-message-preloader--documentatie'
    ),
    buildWTConfig('vl-rich-data', richDataArgTypes, null, '/docs/components-rich-data--documentatie'),
    buildWTConfig(
        'vl-rich-data-table',
        richDataTableArgTypes,
        '../../libs/components/src/rich-data-table/stories/vl-rich-data-table.stories-doc.mdx',
        '/docs/components-rich-data-table--documentatie'
    ),
    buildWTConfig('vl-rich-data-field', null, null, '/docs/components-rich-data-table--documentatie'),
    buildWTConfig('vl-rich-data-sorter', null, null, '/docs/components-rich-data-table--documentatie'),
    buildWTConfig('vl-search', null, null, '/docs/components-search--documentatie'),
    buildWTConfig('vl-share-button', shareButtonArgTypes, null, '/docs/components-share-buttons-button--documentatie'),
    buildWTConfig(
        'vl-share-buttons',
        shareButtonsArgTypes,
        null,
        '/docs/components-share-buttons-buttons--documentatie'
    ),
    buildWTConfig(
        'vl-side-sheet',
        sideSheetArgTypes,
        '../../libs/components/src/side-sheet/stories/vl-side-sheet.stories-doc.mdx',
        '/docs/components-side-sheet--documentatie'
    ),
    buildWTConfig('vl-spotlight', spotlightArgTypes, null, '/docs/components-spotlight--documentatie'),
    buildWTConfig(
        'vl-tabs',
        tabsArgTypes,
        '../../libs/components/src/tabs/stories/vl-tabs.stories-doc.mdx',
        '/docs/components-tabs--documentatie'
    ),
    buildWTConfig('vl-tabs-pane', tabsPaneArgTypes, null, '/docs/components-tabs--documentatie'),
    buildWTConfig('vl-tab', null, null, '/docs/components-tabs--documentatie'),
    buildWTConfig('vl-tab-section', null, null, '/docs/components-tabs--documentatie'),
    buildWTConfig('vl-template', templateArgTypes, null, '/docs/components-template--documentatie'),
    buildWTConfig(
        'vl-toaster',
        toasterArgTypes,
        '../../libs/components/src/toaster/stories/vl-toaster.stories-doc.mdx',
        '/docs/components-toaster--documentatie'
    ),
    buildWTConfig('vl-typography', typographyArgTypes, null, '/docs/components-typography--documentatie'),
    buildWTConfig(
        'vl-video-player',
        videoPlayerArgTypes,
        '../../libs/components/src/video-player/stories/vl-video-player.stories-doc.mdx',
        '/docs/components-video-player--documentatie'
    ),
    buildWTConfig(
        'vl-wizard',
        wizardArgTypes,
        '../../libs/components/src/wizard/stories/vl-wizard.stories-doc.mdx',
        '/docs/components-wizard-wizard--documentatie'
    ),
    buildWTConfig(
        'vl-wizard-pane',
        wizardPaneArgTypes,
        '../../libs/components/src/wizard/stories/vl-wizard-pane.stories-doc.mdx',
        '/docs/components-wizard-wizard-pane--documentatie'
    ),
];
