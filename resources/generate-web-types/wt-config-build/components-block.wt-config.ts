import { accordionArgTypes } from '../../../libs/components/src/block/accordion/stories/vl-accordion.stories-arg';
import { alertArgTypes } from '../../../libs/components/src/block/alert/stories/vl-alert.stories-arg';
import { autocompleteArgTypes } from '../../../libs/components/src/block/autocomplete/stories/vl-autocomplete.stories-arg';
import { breadcrumbItemArgTypes } from '../../../libs/components/src/block/breadcrumb/stories/vl-breadcrumb-item.stories-arg';
import { cascaderItemArgTypes } from '../../../libs/components/src/block/cascader/stories/vl-cascader-item.stories-arg';
import { cascaderArgTypes } from '../../../libs/components/src/block/cascader/stories/vl-cascader.stories-arg';
import { contentHeaderArgTypes } from '../../../libs/components/src/block/content-header/stories/vl-content-header.stories-arg';
import { descriptionDataItemArgTypes } from '../../../libs/components/src/block/description-data/stories/vl-description-data-item.stories-arg';
import { descriptionDataArgTypes } from '../../../libs/components/src/block/description-data/stories/vl-description-data.stories-arg';
import { documentArgTypes } from '../../../libs/components/src/block/document/stories/vl-document.stories-arg';
import { doormatArgTypes } from '../../../libs/components/src/block/doormat/stories/vl-doormat.stories-arg';
import { functionalHeaderArgTypes } from '../../../libs/components/src/block/functional-header/stories/vl-functional-header.stories-arg';
import { httpErrorMessageArgTypes } from '../../../libs/components/src/block/http-error-message/stories/vl-http-error-message.stories-arg';
import { infoTileArgTypes } from '../../../libs/components/src/block/info-tile/stories/vl-info-tile.stories-arg';
import { infoblockArgTypes } from '../../../libs/components/src/block/infoblock/stories/vl-infoblock.stories-arg';
import { infotextArgTypes } from '../../../libs/components/src/block/infotext/stories/vl-infotext.stories-arg';
import { inputSliderArgTypes } from '../../../libs/components/src/block/input-slider/stories/vl-input-slider.stories-arg';
import { loaderArgTypes } from '../../../libs/components/src/block/loader/stories/vl-loader.stories-arg';
import { modalArgTypes } from '../../../libs/components/src/block/modal/stories/vl-modal.stories-arg';
import { sideNavigationLayoutArgTypes } from '../../../libs/components/src/block/next/side-navigation/stories/vl-side-navigation-layout.stories-arg';
import { sideNavigationArgTypes } from '../../../libs/components/src/block/next/side-navigation/stories/vl-side-navigation.stories-arg';
import { pagerArgTypes } from '../../../libs/components/src/block/pager/stories/vl-pager.stories-arg';
import { pillArgTypes } from '../../../libs/components/src/block/pill/stories/vl-pill.stories-arg';
import { popoverArgTypes } from '../../../libs/components/src/block/popover/stories/vl-popover.stories-arg';
import { progressBarArgTypes } from '../../../libs/components/src/block/progress-bar/stories/vl-progress-bar.stories-arg';
import { progressIndicatorArgTypes } from '../../../libs/components/src/block/progress-indicator/stories/vl-progress-indicator.stories-arg';
import { propertiesArgTypes } from '../../../libs/components/src/block/properties/stories/vl-properties.stories-arg';
import { prozaMessagePreloaderArgTypes } from '../../../libs/components/src/block/proza-message/stories/vl-proza-message-preloader.stories-arg';
import { prozaMessageArgTypes } from '../../../libs/components/src/block/proza-message/stories/vl-proza-message.stories-arg';
import { richDataTableArgTypes } from '../../../libs/components/src/block/rich-data-table/stories/vl-rich-data-table.stories-arg';
import { richDataArgTypes } from '../../../libs/components/src/block/rich-data/stories/vl-rich-data.stories-arg';
import { searchFilterArgTypes } from '../../../libs/components/src/block/search-filter/stories/vl-search-filter.stories-arg';
import { searchResultArgTypes } from '../../../libs/components/src/block/search-result/stories/vl-search-result.stories-arg';
import { shareButtonArgTypes } from '../../../libs/components/src/block/share-buttons/stories/vl-share-button.stories-arg';
import { shareButtonsArgTypes } from '../../../libs/components/src/block/share-buttons/stories/vl-share-buttons.stories-arg';
import { sideSheetArgTypes } from '../../../libs/components/src/block/side-sheet/stories/vl-side-sheet.stories-arg';
import { spotlightArgTypes } from '../../../libs/components/src/block/spotlight/stories/vl-spotlight.stories-arg';
import { stepArgTypes } from '../../../libs/components/src/block/steps/stories/vl-step.stories-arg';
import { stepsArgTypes } from '../../../libs/components/src/block/steps/stories/vl-steps.stories-arg';
import { tableArgTypes } from '../../../libs/components/src/block/table/stories/vl-table.stories-arg';
import { tabsPaneArgTypes } from '../../../libs/components/src/block/tabs/stories/vl-tabs-pane.stories-arg';
import { tabsArgTypes } from '../../../libs/components/src/block/tabs/stories/vl-tabs.stories-arg';
import { templateArgTypes } from '../../../libs/components/src/block/template/stories/vl-template.stories-arg';
import { toasterArgTypes } from '../../../libs/components/src/block/toaster/stories/vl-toaster.stories-arg';
import { tooltipArgTypes } from '../../../libs/components/src/block/tooltip/stories/vl-tooltip.stories-arg';
import { typographyArgTypes } from '../../../libs/components/src/block/typography/stories/vl-typography.stories-arg';
import { uploadProgressArgTypes } from '../../../libs/components/src/block/upload-progress/stories/vl-upload-progress.stories-arg';
import { videoPlayerArgTypes } from '../../../libs/components/src/block/video-player/stories/vl-video-player.stories-arg';
import { wizardPaneArgTypes } from '../../../libs/components/src/block/wizard/stories/vl-wizard-pane.stories-arg';
import { wizardArgTypes } from '../../../libs/components/src/block/wizard/stories/vl-wizard.stories-arg';
import { WTConfigArray } from '../web-types.model';
import { buildWTConfig } from './utils.wt-config';

export const buildWTConfigComponentsBlock: WTConfigArray = [
    buildWTConfig(
        'vl-accordion',
        accordionArgTypes,
        '../../libs/components/src/block/accordion/stories/vl-accordion.stories-doc.mdx',
        '/docs/components-block-accordion--documentatie'
    ),
    buildWTConfig(
        'vl-alert',
        alertArgTypes,
        '../../libs/components/src/block/alert/stories/vl-alert.stories-doc.mdx',
        '/docs/components-block-alert--documentatie'
    ),
    buildWTConfig(
        'vl-autocomplete',
        autocompleteArgTypes,
        '../../libs/components/src/block/autocomplete/stories/vl-autocomplete.stories-doc.mdx',
        '/docs/components-block-autocomplete--documentatie'
    ),
    buildWTConfig(
        'vl-breadcrumb',
        null,
        '../../libs/components/src/block/breadcrumb/stories/vl-breadcrumb.stories-doc.mdx',
        '/docs/components-block-breadcrumb--documentatie'
    ),
    buildWTConfig(
        'vl-breadcrumb-item',
        breadcrumbItemArgTypes,
        null,
        '/docs/components-block-breadcrumb--documentatie'
    ),
    buildWTConfig('vl-contact-card', null, null, '/docs/components-block-contact-card--documentatie'),
    buildWTConfig(
        'vl-content-header',
        contentHeaderArgTypes,
        '../../libs/components/src/block/content-header/stories/vl-content-header.stories-doc.mdx',
        '/docs/components-block-content-header--documentatie'
    ),
    buildWTConfig(
        'vl-description-data',
        descriptionDataArgTypes,
        null,
        '/docs/components-block-description-data-description-data--documentatie'
    ),
    buildWTConfig(
        'vl-description-data-item',
        descriptionDataItemArgTypes,
        null,
        '/docs/components-block-description-data-description-data-item--documentatie'
    ),
    buildWTConfig(
        'vl-document',
        documentArgTypes,
        '../../libs/components/src/block/document/stories/vl-document.stories-doc.mdx',
        '/docs/components-block-document--documentatie'
    ),
    buildWTConfig(
        'vl-functional-header',
        functionalHeaderArgTypes,
        '../../libs/components/src/block/functional-header/stories/vl-functional-header.stories-doc.mdx',
        '/docs/components-block-functional-header--documentatie'
    ),
    buildWTConfig(
        'vl-http-error-message',
        httpErrorMessageArgTypes,
        '../../libs/components/src/block/http-error-message/stories/vl-http-error-message.stories-doc.mdx',
        '/docs/components-block-http-error-message--documentatie'
    ),
    buildWTConfig(
        'vl-info-tile',
        infoTileArgTypes,
        '../../libs/components/src/block/info-tile/stories/vl-info-tile.stories-doc.mdx',
        '/docs/components-block-info-tile--documentatie'
    ),
    buildWTConfig('vl-infoblock', infoblockArgTypes, null, '/docs/components-block-infoblock--documentatie'),
    buildWTConfig(
        'vl-input-slider',
        inputSliderArgTypes,
        '../../libs/components/src/block/input-slider/stories/vl-input-slider.stories-doc.mdx',
        '/docs/components-block-input-slider--documentatie'
    ),
    buildWTConfig('vl-loader', loaderArgTypes, null, '/docs/components-block-loader--documentatie'),
    buildWTConfig('vl-modal', modalArgTypes, null, '/docs/components-block-modal--documentatie'),
    buildWTConfig(
        'vl-cascader',
        cascaderArgTypes,
        '../../libs/components/src/block/cascader/stories/vl-cascader.stories-doc.mdx',
        '/docs/components-block-cascader-cascader--documentatie'
    ),
    buildWTConfig(
        'vl-cascader-item',
        cascaderItemArgTypes,
        null,
        '/docs/components-block-cascader-cascader-item--documentatie'
    ),
    buildWTConfig(
        'vl-table',
        tableArgTypes,
        '../../libs/components/src/block/table/stories/vl-table.stories-doc.mdx',
        '/docs/components-block-table--documentatie'
    ),
    buildWTConfig(
        'vl-doormat',
        doormatArgTypes,
        '../../libs/components/src/block/doormat/stories/vl-doormat.stories-doc.mdx',
        '/docs/components-block-doormat--documentatie'
    ),
    buildWTConfig(
        'vl-infotext',
        infotextArgTypes,
        '../../libs/components/src/block/infotext/stories/vl-infotext.stories-doc.mdx',
        '/docs/components-block-infotext--documentatie'
    ),
    buildWTConfig(
        'vl-properties',
        propertiesArgTypes,
        '../../libs/components/src/block/properties/stories/vl-properties.stories-doc.mdx',
        '/docs/components-block-properties--documentatie'
    ),
    buildWTConfig(
        'vl-search-result',
        searchResultArgTypes,
        '../../libs/components/src/block/search-result/stories/vl-search-result.stories-doc.mdx',
        '/docs/components-block-search-result--documentatie'
    ),
    buildWTConfig('vl-search-result-title', null, null, '/docs/components-block-search-result--documentatie'),
    buildWTConfig('vl-search-result-text', null, null, '/docs/components-block-search-result--documentatie'),
    buildWTConfig('vl-search-result-properties', null, null, '/docs/components-block-search-result--documentatie'),
    buildWTConfig(
        'vl-side-navigation-next',
        null,
        '../../libs/components/src/block/next/side-navigation/stories/vl-side-navigation.stories-doc.mdx',
        '/docs/components-block-next-side-navigation-next--documentatie'
    ),
    buildWTConfig(
        'vl-side-navigation-layout-next',
        sideNavigationLayoutArgTypes,
        '../../libs/components/src/block/next/side-navigation/stories/vl-side-navigation-layout.stories-doc.mdx',
        '/docs/components-block-next-side-navigation-layout--documentatie'
    ),
    buildWTConfig(
        'vl-side-navigation',
        sideNavigationArgTypes,
        '../../libs/components/src/block/side-navigation/stories/vl-side-navigation.stories-doc.mdx',
        '/docs/components-block-side-navigation--documentatie'
    ),
    buildWTConfig('vl-side-navigation-content', null, null, '/docs/components-block-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-group', null, null, '/docs/components-block-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-item', null, null, '/docs/components-block-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-reference', null, null, '/docs/components-block-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-h1', null, null, '/docs/components-block-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-h2', null, null, '/docs/components-block-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-h3', null, null, '/docs/components-block-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-h4', null, null, '/docs/components-block-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-h5', null, null, '/docs/components-block-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-h6', null, null, '/docs/components-block-side-navigation--documentatie'),
    buildWTConfig('vl-side-navigation-toggle', null, null, '/docs/components-block-side-navigation--documentatie'),
    buildWTConfig(
        'vl-search-filter',
        searchFilterArgTypes,
        '../../libs/components/src/block/search-filter/stories/vl-search-filter.stories-doc.mdx',
        '/docs/components-block-search-filter--documentatie'
    ),
    buildWTConfig(
        'vl-steps',
        stepsArgTypes,
        '../../libs/components/src/block/steps/stories/vl-steps.stories-doc.mdx',
        '/docs/components-block-steps-steps--documentatie'
    ),
    buildWTConfig('vl-step', stepArgTypes, null, '/docs/components-block-steps-step--documentatie'),
    buildWTConfig('vl-duration-step', null, null, '/docs/components-block-steps-steps--documentatie'),
    buildWTConfig('vl-pager', pagerArgTypes, null, '/docs/components-block-pager--documentatie'),
    buildWTConfig('vl-pill', pillArgTypes, null, '/docs/components-block-pill-pill--documentatie'),
    buildWTConfig(
        'vl-popover',
        popoverArgTypes,
        '../../libs/components/src/block/popover/stories/vl-popover.stories-doc.mdx',
        '/docs/components-block-popover--documentatie'
    ),
    buildWTConfig('vl-popover-action', null, null, '/docs/components-block-popover--documentatie'),
    buildWTConfig('vl-popover-action-list', null, null, '/docs/components-block-popover--documentatie'),
    buildWTConfig(
        'vl-progress-bar',
        progressBarArgTypes,
        '../../libs/components/src/block/progress-bar/stories/vl-progress-bar.stories-doc.mdx',
        '/docs/components-block-progress-bar--documentatie'
    ),
    buildWTConfig(
        'vl-progress-indicator',
        progressIndicatorArgTypes,
        '../../libs/components/src/block/progress-indicator/stories/vl-progress-indicator.stories-doc.mdx',
        '/docs/components-block-progress-indicator--documentatie'
    ),
    buildWTConfig(
        'vl-proza-message',
        prozaMessageArgTypes,
        '../../libs/components/src/block/proza-message/stories/vl-proza-message.stories-doc.mdx',
        '/docs/components-block-proza-message--documentatie'
    ),
    buildWTConfig(
        'vl-proza-message-preloader',
        prozaMessagePreloaderArgTypes,
        '../../libs/components/src/block/proza-message/stories/vl-proza-message-preloader.stories-doc.mdx',
        '/docs/components-block-proza-message-preloader--documentatie'
    ),
    buildWTConfig('vl-rich-data', richDataArgTypes, null, '/docs/components-block-rich-data--documentatie'),
    buildWTConfig(
        'vl-rich-data-table',
        richDataTableArgTypes,
        '../../libs/components/src/block/rich-data-table/stories/vl-rich-data-table.stories-doc.mdx',
        '/docs/components-block-rich-data-table--documentatie'
    ),
    buildWTConfig('vl-rich-data-field', null, null, '/docs/components-block-rich-data-table--documentatie'),
    buildWTConfig('vl-rich-data-sorter', null, null, '/docs/components-block-rich-data-table--documentatie'),
    buildWTConfig(
        'vl-search',
        null,
        '../../libs/components/src/block/search/stories/vl-search.stories-doc.mdx',
        '/docs/components-block-search--documentatie',
        'Deprecated en wordt verwijderd in v3. Bouw een zoekformulier met de input-group (vl-input-field + vl-button met loading).'
    ),
    buildWTConfig(
        'vl-share-button',
        shareButtonArgTypes,
        '../../libs/components/src/block/share-buttons/stories/vl-share-button.stories-doc.mdx',
        '/docs/components-block-share-buttons-share-button--documentatie',
        'Deprecated en wordt verwijderd in v3. Gebruik een vl-button met cta-link, icon en label.'
    ),
    buildWTConfig(
        'vl-share-buttons',
        shareButtonsArgTypes,
        '../../libs/components/src/block/share-buttons/stories/vl-share-buttons.stories-doc.mdx',
        '/docs/components-block-share-buttons-share-buttons--documentatie',
        'Deprecated en wordt verwijderd in v3. Gebruik een vl-button met cta-link, icon en label.'
    ),
    buildWTConfig(
        'vl-side-sheet',
        sideSheetArgTypes,
        '../../libs/components/src/block/side-sheet/stories/vl-side-sheet.stories-doc.mdx',
        '/docs/components-block-side-sheet--documentatie'
    ),
    buildWTConfig('vl-spotlight', spotlightArgTypes, null, '/docs/components-block-spotlight--documentatie'),
    buildWTConfig(
        'vl-tabs',
        tabsArgTypes,
        '../../libs/components/src/block/tabs/stories/vl-tabs.stories-doc.mdx',
        '/docs/components-block-tabs--documentatie'
    ),
    buildWTConfig(
        'vl-tabs-next',
        tabsArgTypes,
        '../../libs/components/src/block/next/tabs/stories/vl-tabs.stories-doc.mdx',
        '/docs/components-block-next-tabs--documentatie'
    ),
    buildWTConfig('vl-tab-next', null, null, '/docs/components-block-next-tabs--documentatie'),
    buildWTConfig('vl-tab-link-next', null, null, '/docs/components-block-next-tabs--documentatie'),
    buildWTConfig('vl-tab-panel-next', null, null, '/docs/components-block-next-tabs--documentatie'),
    buildWTConfig('vl-tabs-pane', tabsPaneArgTypes, null, '/docs/components-block-tabs--documentatie'),
    buildWTConfig('vl-tab', null, null, '/docs/components-block-tabs--documentatie'),
    buildWTConfig('vl-tab-section', null, null, '/docs/components-block-tabs--documentatie'),
    buildWTConfig('vl-template', templateArgTypes, null, '/docs/components-block-template--documentatie'),
    buildWTConfig(
        'vl-toaster',
        toasterArgTypes,
        '../../libs/components/src/block/toaster/stories/vl-toaster.stories-doc.mdx',
        '/docs/components-block-toaster--documentatie'
    ),
    buildWTConfig(
        'vl-tooltip',
        tooltipArgTypes,
        '../../libs/components/src/block/tooltip/stories/vl-tooltip.stories-doc.mdx',
        '/docs/components-block-tooltip--documentatie'
    ),
    buildWTConfig('vl-typography', typographyArgTypes, null, '/docs/components-block-typography--documentatie'),
    buildWTConfig(
        'vl-upload-progress',
        uploadProgressArgTypes,
        '../../libs/components/src/block/upload-progress/stories/vl-upload-progress.stories-doc.mdx',
        '/docs/components-block-upload-progress--documentatie'
    ),
    buildWTConfig(
        'vl-video-player',
        videoPlayerArgTypes,
        '../../libs/components/src/block/video-player/stories/vl-video-player.stories-doc.mdx',
        '/docs/components-block-video-player--documentatie'
    ),
    buildWTConfig(
        'vl-wizard',
        wizardArgTypes,
        '../../libs/components/src/block/wizard/stories/vl-wizard.stories-doc.mdx',
        '/docs/components-block-wizard-wizard--documentatie'
    ),
    buildWTConfig(
        'vl-wizard-pane',
        wizardPaneArgTypes,
        '../../libs/components/src/block/wizard/stories/vl-wizard-pane.stories-doc.mdx',
        '/docs/components-block-wizard-wizard-pane--documentatie'
    ),
];
