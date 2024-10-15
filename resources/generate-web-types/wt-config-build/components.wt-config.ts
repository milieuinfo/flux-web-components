import { buttonArgTypes } from '@domg-wc/components/next/button/stories/vl-button.stories-arg';
import { cascaderItemArgTypes } from '@domg-wc/components/next/cascader/stories/vl-cascader-item.stories-arg';
import { cascaderArgTypes } from '@domg-wc/components/next/cascader/stories/vl-cascader.stories-arg';
import { doormatArgTypes } from '@domg-wc/components/next/doormat/stories/vl-doormat.stories-arg';
import { iconArgTypes } from '@domg-wc/components/next/icon/stories/vl-icon.stories-arg';
import { infotextArgTypes } from '@domg-wc/components/next/infotext/stories/vl-infotext.stories-arg';
import { linkArgTypes } from '@domg-wc/components/next/link/stories/vl-link.stories-arg';
import { propertiesArgTypes } from '@domg-wc/components/next/properties/stories/vl-properties.stories-arg';
import { searchFilterArgTypes } from '@domg-wc/components/next/search-filter/stories/vl-search-filter.stories-arg';
import { stepArgTypes } from '@domg-wc/components/next/steps/stories/vl-step.stories-arg';
import { stepsArgTypes } from '@domg-wc/components/next/steps/stories/vl-steps.stories-arg';
import { titleArgTypes } from '@domg-wc/components/next/title/stories/vl-title.stories-arg';
import { videoPlayerArgTypes } from '@domg-wc/components/next/video-player/stories/vl-video-player.stories-arg';
import { accordionListArgTypes } from '../../../libs/components/src/accordion-list/stories/vl-accordion-list.stories-arg';
import { accordionArgTypes } from '../../../libs/components/src/accordion/stories/vl-accordion.stories-arg';
import { alertArgTypes } from '../../../libs/components/src/alert/stories/vl-alert.stories-arg';
import { annotationArgTypes } from '../../../libs/components/src/annotation/stories/vl-annotation.stories-arg';
import { autocompleteArgTypes } from '../../../libs/components/src/autocomplete/stories/vl-autocomplete.stories-arg';
import { breadcrumbItemArgTypes } from '../../../libs/components/src/breadcrumb/stories/vl-breadcrumb-item.stories-arg';
import { checkboxArgTypes } from '../../../libs/components/src/checkbox/stories/vl-checkbox.stories-arg';
import { contentHeaderArgTypes } from '../../../libs/components/src/content-header/stories/vl-content-header.stories-arg';
import { datepickerArgTypes } from '../../../libs/components/src/datepicker/stories/vl-datepicker.stories-arg';
import { descriptionDataItemArgTypes } from '../../../libs/components/src/description-data/stories/vl-description-data-item.stories-arg';
import { descriptionDataArgTypes } from '../../../libs/components/src/description-data/stories/vl-description-data.stories-arg';
import { documentArgTypes } from '../../../libs/components/src/document/stories/vl-document.stories-arg';
import { functionalHeaderArgTypes } from '../../../libs/components/src/functional-header/stories/vl-functional-header.stories-arg';
import { httpErrorMessageArgTypes } from '../../../libs/components/src/http-error-message/stories/vl-http-error-message.stories-arg';
import { infoTileArgTypes } from '../../../libs/components/src/info-tile/stories/vl-info-tile.stories-arg';
import { infoblockArgTypes } from '../../../libs/components/src/infoblock/stories/vl-infoblock.stories-arg';
import { inputSliderArgTypes } from '../../../libs/components/src/input-slider/stories/vl-input-slider.stories-arg';
import { loaderArgTypes } from '../../../libs/components/src/loader/stories/vl-loader.stories-arg';
import { modalArgTypes } from '../../../libs/components/src/modal/stories/vl-modal.stories-arg';
import { pagerArgTypes } from '../../../libs/components/src/pager/stories/vl-pager.stories-arg';
import { buttonPillArgTypes } from '../../../libs/components/src/pill/stories/vl-button-pill.stories-arg';
import { pillArgTypes } from '../../../libs/components/src/pill/stories/vl-pill.stories-arg';
import { popoverArgTypes } from '../../../libs/components/src/popover/stories/vl-popover.stories-arg';
import { progressBarArgTypes } from '../../../libs/components/src/progress-bar/stories/vl-progress-bar.stories-arg';
import { prozaMessagePreloaderArgTypes } from '../../../libs/components/src/proza-message/stories/vl-proza-message-preloader.stories-arg';
import { prozaMessageArgTypes } from '../../../libs/components/src/proza-message/stories/vl-proza-message.stories-arg';
import { radioArgTypes } from '../../../libs/components/src/radio/stories/vl-radio.stories-arg';
import { richDataTableArgTypes } from '../../../libs/components/src/rich-data-table/stories/vl-rich-data-table.stories-arg';
import { richDataArgTypes } from '../../../libs/components/src/rich-data/stories/vl-rich-data.stories-arg';
import { shareButtonArgTypes } from '../../../libs/components/src/share-buttons/stories/vl-share-button.stories-arg';
import { shareButtonsArgTypes } from '../../../libs/components/src/share-buttons/stories/vl-share-buttons.stories-arg';
import { sideSheetArgTypes } from '../../../libs/components/src/side-sheet/stories/vl-side-sheet.stories-arg';
import { spotlightArgTypes } from '../../../libs/components/src/spotlight/stories/vl-spotlight.stories-arg';
import { tabsPaneArgTypes } from '../../../libs/components/src/tabs/stories/vl-tabs-pane.stories-arg';
import { tabsArgTypes } from '../../../libs/components/src/tabs/stories/vl-tabs.stories-arg';
import { templateArgTypes } from '../../../libs/components/src/template/stories/vl-template.stories-arg';
import { textareaArgTypes } from '../../../libs/components/src/textarea/stories/vl-textarea.stories-arg';
import { toasterArgTypes } from '../../../libs/components/src/toaster/stories/vl-toaster.stories-arg';
import { toggleButtonArgTypes } from '../../../libs/components/src/toggle-button/stories/vl-toggle-button.stories-arg';
import { tooltipArgTypes } from '../../../libs/components/src/tooltip/stories/vl-tooltip.stories-arg';
import { typographyArgTypes } from '../../../libs/components/src/typography/stories/vl-typography.stories-arg';
import { uploadArgTypes } from '../../../libs/components/src/upload/stories/vl-upload.stories-args';
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
        'vl-accordion-list',
        accordionListArgTypes,
        '../../libs/components/src/accordion-list/stories/vl-accordion-list.stories-doc.mdx',
        '/docs/components-accordion-list--documentatie'
    ),
    buildWTConfig(
        'vl-alert',
        alertArgTypes,
        '../../libs/components/src/alert/stories/vl-alert.stories-doc.mdx',
        '/docs/components-alert--documentatie'
    ),
    buildWTConfig('vl-annotation', annotationArgTypes, null, '/docs/components-annotation--documentatie'),
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
    buildWTConfig(
        'vl-checkbox',
        checkboxArgTypes,
        '../../libs/components/src/checkbox/stories/vl-checkbox.stories-doc.mdx',
        '/docs/components-checkbox--documentatie'
    ),
    buildWTConfig('vl-code-preview', null, null, '/docs/components-code-preview--documentatie'),
    buildWTConfig('vl-contact-card', null, null, '/docs/components-contact-card--documentatie'),
    buildWTConfig(
        'vl-content-header',
        contentHeaderArgTypes,
        '../../libs/components/src/content-header/stories/vl-content-header.stories-doc.mdx',
        '/docs/components-content-header--documentatie'
    ),
    buildWTConfig(
        'vl-datepicker',
        datepickerArgTypes,
        '../../libs/components/src/datepicker/stories/vl-datepicker.stories-doc.mdx',
        '/docs/components-datepicker--documentatie'
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
        'vl-button-next',
        buttonArgTypes,
        '../../libs/components/src/next/button/stories/vl-button.stories-doc.mdx',
        '/docs/components-next-button--documentatie'
    ),
    buildWTConfig(
        'vl-cascader',
        cascaderArgTypes,
        '../../libs/components/src/next/cascader/stories/vl-cascader.stories-doc.mdx',
        '/docs/components-next-cascader-cascader--documentatie'
    ),
    buildWTConfig(
        'vl-cascader-item',
        cascaderItemArgTypes,
        null,
        '/docs/components-next-cascader-cascader-item--documentatie'
    ),
    buildWTConfig(
        'vl-doormat-next',
        doormatArgTypes,
        '../../libs/components/src/next/doormat/stories/vl-doormat.stories-doc.mdx',
        '/docs/components-next-doormat--documentatie'
    ),
    buildWTConfig(
        'vl-icon-next',
        iconArgTypes,
        '../../libs/components/src/next/icon/stories/vl-icon.stories-doc.mdx',
        '/docs/components-next-icon--documentatie'
    ),
    buildWTConfig(
        'vl-infotext-next',
        infotextArgTypes,
        '../../libs/components/src/next/infotext/stories/vl-infotext.stories-doc.mdx',
        '/docs/components-next-infotext--documentatie'
    ),
    buildWTConfig(
        'vl-link-next',
        linkArgTypes,
        '../../libs/components/src/next/link/stories/vl-link.stories-doc.mdx',
        '/docs/components-next-link--documentatie'
    ),
    buildWTConfig(
        'vl-properties-next',
        propertiesArgTypes,
        '../../libs/components/src/next/properties/stories/vl-properties.stories-doc.mdx',
        '/docs/components-next-properties--documentatie'
    ),
    buildWTConfig(
        'vl-search-filter-next',
        searchFilterArgTypes,
        '../../libs/components/src/next/search-filter/stories/vl-search-filter.stories-doc.mdx',
        '/docs/components-next-search-filter--documentatie'
    ),
    buildWTConfig(
        'vl-steps-next',
        stepsArgTypes,
        '../../libs/components/src/next/steps/stories/vl-steps.stories-doc.mdx',
        '/docs/components-next-steps-steps--documentatie'
    ),
    buildWTConfig('vl-step-next', stepArgTypes, null, '/docs/components-next-steps-step--documentatie'),
    buildWTConfig('vl-duration-step-next', null, null, '/docs/components-next-steps-steps--documentatie'),
    buildWTConfig(
        'vl-title-next',
        titleArgTypes,
        '../../libs/components/src/next/title/stories/vl-title.stories-doc.mdx',
        '/docs/components-next-title--documentatie'
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
    buildWTConfig(
        'vl-radio',
        radioArgTypes,
        '../../libs/components/src/radio/stories/vl-radio.stories-doc.mdx',
        '/docs/components-radio--documentatie'
    ),
    buildWTConfig('vl-radio-group', null, null, '/docs/components-radio--documentatie'),
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
        'vl-steps',
        stepsArgTypes,
        '../../libs/components/src/steps/stories/vl-steps.stories-doc.mdx',
        '/docs/components-steps--documentatie'
    ),
    buildWTConfig('vl-step', null, null, '/docs/components-steps--documentatie'),
    buildWTConfig('vl-duration-step', null, null, '/docs/components-steps--documentatie'),
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
        'vl-textarea',
        textareaArgTypes,
        '../../libs/components/src/textarea/stories/vl-textarea.stories-doc.mdx',
        '/docs/components-textarea--documentatie'
    ),
    buildWTConfig('vl-textarea-modal', null, null, '/docs/components-textarea--documentatie'),
    buildWTConfig('vl-toaster', toasterArgTypes, null, '/docs/components-toaster--documentatie'),
    buildWTConfig('vl-toggle-button', toggleButtonArgTypes, null, '/docs/components-toggle-button--documentatie'),
    buildWTConfig(
        'vl-tooltip',
        tooltipArgTypes,
        '../../libs/components/src/tooltip/stories/vl-tooltip.stories-doc.mdx',
        '/docs/components-tooltip--documentatie'
    ),
    buildWTConfig('vl-typography', typographyArgTypes, null, '/docs/components-typography--documentatie'),
    buildWTConfig(
        'vl-upload',
        uploadArgTypes,
        '../../libs/components/src/upload/stories/vl-upload.stories-doc.mdx',
        '/docs/components-upload--documentatie'
    ),
    buildWTConfig(
        'vl-video-player-next',
        videoPlayerArgTypes,
        '../../libs/components/src/next/video-player/stories/vl-video-player.stories-doc.mdx',
        '/docs/components-next-video-player--documentatie'
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
