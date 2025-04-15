import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlUploadComponent } from './vl-upload.component';

registerWebComponents([VlUploadComponent]);

const pdfFileFixturePath = 'fixtures/upload/file.pdf';
const txtFileFixturePath = 'fixtures/upload/file.txt';
const mockedResponseFixturePath = 'upload/upload-mock-response-200.json';
const uploadTargetUrl = 'fake-url';

describe('component - vl-upload', () => {
    it('should mount', () => {
        cy.mount(html` <vl-upload label="test-label"></vl-upload>`);

        cy.get('vl-upload').shadow().find('input');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-upload label="test-label"></vl-upload>`);
        cy.injectAxe();

        cy.checkA11y('vl-upload');
    });

    it('should initialise', () => {
        cy.mount(html` <vl-upload label="test-label"></vl-upload>`);

        cy.createStubForEvent('vl-upload', 'vl-initialised');
        cy.get('@vl-initialised').its('callCount').should('eq', 1);
    });

    it('should set id', () => {
        cy.mount(html` <vl-upload id="test-id"></vl-upload>`);

        cy.get('vl-upload').should('have.id', 'test-id');
        cy.get('vl-upload').shadow().find('input').should('have.id', 'test-id');
    });

    it('should set name', () => {
        cy.mount(html` <vl-upload name="test-name"></vl-upload>`);
        cy.createStubForEvent('vl-upload', 'vl-initialised');

        cy.get('@vl-initialised').its('callCount').should('eq', 1);

        cy.get('vl-upload').should('have.attr', 'name', 'test-name');
        cy.get('vl-upload').shadow().find('input').should('have.attr', 'name', 'test-name');

        cy.get('vl-upload').then((vlUploadQuery) => {
            // @ts-expect-error private access toelaten
            expect(vlUploadQuery[0].dropzoneInstance.options.paramName).to.equal('test-name');
        });
    });

    it('should set label', () => {
        cy.mount(html` <vl-upload label="test-label"></vl-upload>`);

        cy.get('vl-upload').should('have.attr', 'label', 'test-label');
        cy.get('vl-upload').shadow().find('input').should('have.attr', 'aria-label', 'test-label');
    });

    it('should set required', () => {
        cy.mount(html` <vl-upload required></vl-upload>`);

        cy.get('vl-upload').should('have.attr', 'required');
        cy.get('vl-upload').shadow().find('input').should('have.attr', 'required');
    });

    it('should set disabled', () => {
        cy.mount(html` <vl-upload disabled></vl-upload>`);

        cy.get('vl-upload').should('have.attr', 'disabled');
        cy.get('vl-upload').should('be.disabled');
        cy.get('vl-upload').shadow().find('div').should('have.class', 'vl-upload--disabled');
        cy.get('vl-upload').shadow().find('input').should('be.disabled');
        cy.get('vl-upload').shadow().find('button.vl-upload__element__button').should('be.disabled');

        cy.get('vl-upload')
            .shadow()
            .find('.vl-upload__element')
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(203, 210, 217)' });
    });

    it('should set readonly', () => {
        cy.mount(html` <vl-upload readonly></vl-upload>`);

        cy.get('vl-upload').should('have.attr', 'readonly');
        cy.get('vl-upload').shadow().find('input').should('have.attr', 'readonly');
        cy.get('vl-upload').shadow().find('input').should('have.attr', 'disabled');
    });

    it('should set parallel uploads', () => {
        cy.mount(html` <vl-upload parallel-uploads="3"></vl-upload>`);

        cy.createStubForEvent('vl-upload', 'vl-initialised');
        cy.get('@vl-initialised').its('callCount').should('eq', 1);
        cy.get('vl-upload').should('have.attr', 'parallel-uploads', '3');
        cy.get('vl-upload').then((vlUploadQuery) => {
            // @ts-expect-error private access toelaten
            expect(vlUploadQuery[0].dropzoneInstance.options.parallelUploads).to.equal(3);
        });
    });

    it('should manually add file while readonly', () => {
        cy.mount(html` <vl-upload readonly></vl-upload>`);

        cy.get('vl-upload').should('have.attr', 'readonly');
        cy.createStubForEvent('vl-upload', 'vl-addedfile');

        cy.fixture('upload/file.txt').as('txtFile');
        cy.get('@txtFile').then((fileContent) => {
            const fileText = fileContent as unknown as string;
            const blob = Cypress.Blob.base64StringToBlob(fileText, 'text/plain');
            cy.get('vl-upload').then((vlUploadQuery) => {
                vlUploadQuery[0].addFile(<File>blob);
            });
        });

        cy.get('@vl-addedfile').should('have.been.called');
        shouldHaveUploadFiles(1);
    });

    it('should manually upload', () => {
        cy.mount(html` <vl-upload url="http://httpbin.org/post"></vl-upload>`);

        cy.get('vl-upload').shadow();

        shouldAddPdfFiles(1);
        shouldHaveUploadFiles(1);

        cy.get('vl-upload').then((vlUploadQuery) => {
            shouldSuccessfullyUploadFiles(1, 'http://httpbin.org/post', () => {
                vlUploadQuery[0].upload();
            });
        });
    });

    it('should set error', () => {
        cy.mount(html` <vl-upload error></vl-upload>`);

        cy.get('vl-upload').should('have.attr', 'error');
        cy.get('vl-upload').shadow().find('div').should('have.class', 'vl-upload--error');
        cy.get('vl-upload').shadow().find('input').should('have.attr', 'error');

        cy.get('vl-upload')
            .shadow()
            .find('.vl-upload__element')
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(251, 235, 236)' });
    });

    it('should set success', () => {
        cy.mount(html` <vl-upload success></vl-upload>`);

        cy.get('vl-upload').should('have.attr', 'success');
        cy.get('vl-upload').shadow().find('div').should('have.class', 'vl-upload--success');

        cy.get('vl-upload')
            .shadow()
            .find('.vl-upload__element')
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(230, 245, 237)' });
    });

    it('should dispatch vl-change events when adding file', () => {
        cy.mount(html` <vl-upload max-files="4"></vl-upload>`);

        cy.createStubForEvent('vl-upload', 'vl-change');
        cy.createStubForEvent('vl-upload', 'vl-input');
        shouldAddJpgFilesProgrammatically(1);
        // voor elk bestand wordt er een vl-input event getriggerd van type `addedfile`
        cy.get('@vl-change').its('callCount').should('eq', 1);
        cy.get('@vl-input').its('callCount').should('eq', 0);
    });

    it('should dispatch vl-change events when removing a file', () => {
        cy.mount(html` <vl-upload max-files="4"></vl-upload>`);

        cy.createStubForEvent('vl-upload', 'vl-change');
        cy.createStubForEvent('vl-upload', 'vl-input');
        shouldAddJpgFilesProgrammatically(1);
        shouldRemoveAllFilesProgrammatically();
        cy.get('@vl-change').its('callCount').should('eq', 2);
        cy.get('@vl-input').its('callCount').should('eq', 0);
    });

    it('should dispatch vl-input events when adding file', () => {
        cy.mount(html` <vl-upload max-files="4"></vl-upload>`);

        cy.createStubForEvent('vl-upload', 'vl-input');
        shouldAddPdfFiles(1);
        // voor elk bestand wordt er een vl-input event getriggerd van type `addedfile`
        cy.get('@vl-input').its('callCount').should('eq', 1);
    });

    it('should dispatch vl-input events when removing a file', () => {
        cy.mount(html` <vl-upload max-files="4"></vl-upload>`);

        shouldAddPdfFiles(1);
        cy.createStubForEvent('vl-upload', 'vl-input');
        shouldRemoveFile();
        cy.get('@vl-input').its('callCount').should('eq', 1); // 1 removedFile event
    });

    it('should dispatch vl-input events when adding files in batch', () => {
        cy.mount(html` <vl-upload max-files="4"></vl-upload>`);

        cy.createStubForEvent('vl-upload', 'vl-change');
        cy.createStubForEvent('vl-upload', 'vl-input');
        cy.get('vl-upload')
            .shadow()
            .find('input[type=file]')
            .selectFile([pdfFileFixturePath, pdfFileFixturePath, pdfFileFixturePath, pdfFileFixturePath], {
                force: true,
            });
        // voor elk individueel bestand wordt er een vl-input event getriggerd van type `addedfile`
        cy.get('@vl-change').its('callCount').should('eq', 4); // 4 addedFile events
        cy.get('@vl-input').its('callCount').should('eq', 1);
    });

    it('should not upload by default when selecting a file to upload', () => {
        cy.mount(html` <vl-upload url=${uploadTargetUrl}></vl-upload>`);

        const numberOfFiles = 1;

        cy.intercept('POST', uploadTargetUrl, (req) => {
            req.reply({
                statusCode: 200,
                fixture: mockedResponseFixturePath,
            });
        }).as('uploadPost');
        shouldAddPdfFiles(numberOfFiles);
        cy.get('@uploadPost.all').then((interceptions) => {
            expect(interceptions).to.have.length(0);
        });
        shouldOnlyHaveUnprocessedUploadFiles(numberOfFiles);
    });

    it('should upload a file & have a success flag with auto-process', () => {
        cy.mount(html` <vl-upload url=${uploadTargetUrl} auto-process></vl-upload>`);

        shouldAddPdfFiles(1);
        shouldSuccessfullyUploadFiles(1);
    });

    it('after adding a file and the upload fails, the related file should not have a success flag', () => {
        const numberOfFiles = 1;
        cy.mount(html` <vl-upload url=${uploadTargetUrl} auto-process></vl-upload>`);

        cy.intercept('POST', uploadTargetUrl, (req) => {
            req.reply({
                statusCode: 500,
            });
        }).as('uploadPost');
        shouldAddTxtFiles();
        cy.wait('@uploadPost');
        cy.get('@uploadPost.all').then((interceptions) => {
            expect(interceptions).to.have.length(numberOfFiles);
        });
        shouldHaveUploadFilesWithNoSuccess(numberOfFiles);
    });

    it('should select a file to upload & cancel the upload', () => {
        cy.mount(html` <vl-upload url=${uploadTargetUrl}></vl-upload>`);

        shouldAddPdfFiles(1);
        cy.createStubForEvent('vl-upload', 'vl-input');
        shouldRemoveFile();
        cy.get('@vl-input').should('have.been.called');
    });

    it('should generate error when adding a file with the wrong extension', () => {
        const errorMessage = 'Dit bestandstype is niet toegestaan';
        cy.mount(html` <vl-upload accepted-files="txt" error-message-accepted-files=${errorMessage}></vl-upload> `);

        cy.get('vl-upload').shadow().find('input[type=file]').selectFile(pdfFileFixturePath, { force: true });
        cy.get('vl-upload').shadow().find('.dz-error-message').should('contain', errorMessage, '');
    });

    it('should handle upload events when error occurs', () => {
        const errorMessage = 'Dit bestandstype is niet toegestaan';
        cy.mount(
            html` <vl-upload chunking accepted-files="txt" error-message-accepted-files=${errorMessage}></vl-upload>`
        );

        cy.createStubForEvent('vl-upload', 'vl-error');
        cy.createStubForEvent('vl-upload', 'vl-success');
        cy.createStubForEvent('vl-upload', 'vl-complete');
        cy.createStubForEvent('vl-upload', 'vl-queuecomplete');
        cy.createStubForEvent('vl-upload', 'vl-upload-progress');

        cy.get('vl-upload').shadow().find('input[type=file]').selectFile(pdfFileFixturePath, { force: true });
        cy.get('vl-upload').shadow().find('.dz-error-message').should('contain', errorMessage, '');

        cy.get('@vl-success').should('not.have.been.called');
        cy.get('@vl-error').should('have.been.called');
        cy.get('@vl-complete').should('have.been.called');
        cy.get('@vl-upload-progress').should('not.have.been.called');
        cy.get('@vl-queuecomplete').should('have.been.called');
    });

    it('should register events via `on()` public method', () => {
        const app = {
            handleError: () => {
                console.log('handleError');
            },
            handleComplete: () => {
                console.log('handleComplete');
            },
            handleQueueComplete: () => {
                console.log('handleQueueComplete');
            },
        };

        const handleInitialised = (event: CustomEvent) => {
            const uploadComponent = event.target as VlUploadComponent;
            uploadComponent.on('error', app.handleError);
            uploadComponent.on('complete', app.handleComplete);
            uploadComponent.on('queuecomplete', app.handleQueueComplete);
        };

        cy.mount(html` <vl-upload @vl-initialised=${handleInitialised} accepted-files="txt"></vl-upload>`);
        cy.spy(app, 'handleError').as('handleError');
        cy.spy(app, 'handleComplete').as('handleComplete');
        cy.spy(app, 'handleQueueComplete').as('handleQueueComplete');
        cy.get('vl-upload').shadow().find('input[type=file]').selectFile(pdfFileFixturePath, { force: true });
        cy.get('@handleError').should('have.been.called');
        cy.get('@handleComplete').should('have.been.called');
        cy.get('@handleQueueComplete').should('have.been.called');
    });

    it('should only allow one file by default', () => {
        const errorMessage = 'U mag maar 1 bestand tegelijk uploaden';
        cy.mount(html` <vl-upload error-message-max-files=${errorMessage}></vl-upload>`);

        shouldAddPdfFiles(2);
        cy.get('vl-upload').shadow().find('.dz-error-message').should('contain', errorMessage, '');
    });

    it('should generate error when exceeding the number of files allowed', () => {
        const errorMessage = 'Het maximum aantal toegelaten bestanden is overschreden';
        cy.mount(html` <vl-upload max-files="2" error-message-max-files=${errorMessage}></vl-upload>`);

        shouldAddPdfFiles(3);
        shouldHaveUploadFiles(3, true);
        shouldHaveValidUploadFiles(2, true);
        cy.get('vl-upload').shadow().find('.dz-error-message').should('contain', errorMessage, '');
    });

    it('should remove duplicate files', () => {
        cy.mount(html` <vl-upload disallow-duplicates></vl-upload>`);

        cy.createStubForEvent('vl-upload', 'vl-input');
        cy.createStubForEvent('vl-upload', 'vl-removedfile');
        shouldAddPdfFiles(2);
        shouldHaveUploadFiles(2);
        cy.get('@vl-input').should('have.been.called');
        cy.get('@vl-input').its('firstCall.args.0.detail').should('deep.include', { type: 'addedfile' });
        cy.get('@vl-removedfile').should('have.been.called');
        shouldHaveUploadFiles(1);
    });

    it('should generate error when adding a file that is bigger than allowed', () => {
        const errorMessage = 'Dit bestand heeft de maximale bestandsgrootte overschreden';
        cy.mount(html` <vl-upload max-size="0.01" error-message-filesize=${errorMessage}></vl-upload> `);

        cy.createStubForEvent('vl-upload', 'vl-error');
        cy.get('vl-upload').shadow().find('.dz-default');
        shouldAddPdfFiles(1);
        cy.get('vl-upload').shadow().find('.dz-error-message').should('contain', errorMessage, '');
        cy.get('@vl-error').should('have.been.called');
    });

    it('should select a file to upload and automatically start the upload', () => {
        cy.mount(html`<vl-upload url=${uploadTargetUrl} auto-process></vl-upload>`);

        cy.createStubForEvent('vl-upload', 'vl-upload-progress');
        cy.createStubForEvent('vl-upload', 'vl-success');
        cy.createStubForEvent('vl-upload', 'vl-complete');
        cy.createStubForEvent('vl-upload', 'vl-error');

        cy.intercept('POST', uploadTargetUrl, (req) => {
            req.reply({
                statusCode: 200,
                fixture: mockedResponseFixturePath,
            });
        }).as('uploadPost');

        cy.get('vl-upload').shadow().find('div').not('.vl-upload__file');
        shouldAddPdfFiles(1);
        shouldHaveUploadFiles(1);

        cy.wait('@uploadPost');
        cy.get('@uploadPost.all').then((interceptions) => {
            expect(interceptions).to.have.length(1);
        });
        shouldHaveSuccessUploadFiles(1);

        cy.get('@vl-error').should('not.have.been.called');
        cy.get('@vl-upload-progress').should('have.been.called');
        cy.get('@vl-success').should('have.been.called');
        cy.get('@vl-complete').should('have.been.called');
    });

    it('should change the subtitle and title of the upload component', () => {
        const titel = 'Upload je documenten';
        const subTitel = 'Sleep je bestand naar hier om te uploaden ';
        cy.mount(html` <vl-upload main-title=${titel} sub-title=${subTitel} url="fake-url"></vl-upload>`);

        cy.get('vl-upload').contains(titel);
        cy.get('vl-upload').contains(subTitel);
    });
});

const shouldAddPdfFiles = (number = 1) => {
    for (let i = 0; i < number; i++) {
        cy.get('vl-upload').shadow().find('input[type=file]').selectFile(pdfFileFixturePath, { force: true });
    }
};
const shouldAddTxtFiles = (number = 1) => {
    for (let i = 0; i < number; i++) {
        cy.get('vl-upload').shadow().find('input[type=file]').selectFile(txtFileFixturePath, { force: true });
    }
};

const shouldRemoveFile = () => {
    cy.get('vl-upload').shadow().find('button.vl-upload__files__close').click();
};

const shouldHaveUploadFiles = (number: number, isMultiple?: boolean) => {
    const previewFileSelector = `${isMultiple ? 'li' : 'div'}.vl-upload__file`;
    cy.get('vl-upload').shadow().find(previewFileSelector).its('length').should('eq', number);
};

const shouldHaveValidUploadFiles = (number: number, isMultiple?: boolean) => {
    cy.get('vl-upload')
        .shadow()
        .find(`${isMultiple ? 'li' : 'div'}.vl-upload__file`)
        .not('.dz-error')
        .its('length')
        .should('eq', number);
};

const shouldHaveUploadFilesWithNoSuccess = (number: number, isMultiple?: boolean) => {
    cy.get('vl-upload')
        .shadow()
        .find(`${isMultiple ? 'li' : 'div'}.vl-upload__file`)
        .not('.dz-success')
        .its('length')
        .should('eq', number);
};

const shouldHaveSuccessUploadFiles = (number: number) => {
    cy.get('vl-upload').shadow().find('.dz-success').its('length').should('eq', number);
};

const shouldOnlyHaveUnprocessedUploadFiles = (number: number, isMultiple?: boolean) => {
    cy.get('vl-upload')
        .shadow()
        .find(`${isMultiple ? 'li' : 'div'}.vl-upload__file`)
        .not('.dz-error')
        .not('.dz-success')
        .its('length')
        .should('eq', number);
};

const shouldSuccessfullyUploadFiles = (
    numberOfFiles: number,
    targetUrl = uploadTargetUrl,
    callback?: (...args: unknown[]) => void
) => {
    // intercepts outgoing requests so can test them
    cy.intercept('POST', targetUrl, (req) => {
        req.reply({
            statusCode: 200,
            fixture: mockedResponseFixturePath,
        });
    }).as('uploadPost');
    if (callback) callback();
    cy.wait('@uploadPost');
    cy.get('@uploadPost.all').then((interceptions) => {
        expect(interceptions).to.have.length(numberOfFiles);
    });
    shouldHaveSuccessUploadFiles(numberOfFiles);
};

const shouldAddJpgFilesProgrammatically = (number = 1): File[] => {
    const filesAdded: File[] = [];
    for (let i = 0; i < number; i++) {
        cy.readFile('fixtures/upload/cat.jpeg', 'base64').then((fileContent) => {
            const blob = Cypress.Blob.base64StringToBlob(fileContent);
            const lastModified = new Date().getTime();
            const fileToAdd = new File([blob], 'cat.jpeg', {
                type: 'image/jpeg',
                lastModified,
            });
            cy.get('vl-upload').then((uploadNext) => {
                // gebruiken hier addFile omdat we File object niet kunnen toevoegen met cy.selectFile() (enkel referenties)
                (<HTMLElement & { addFile(file: File): void }>uploadNext[0]).addFile(fileToAdd);
                // we maken de file hier opnieuw aan omdat de file gemuteerd wordt door de upload component
                // meer specifiek worden er Dropzone specifieke properties toegevoegd aan de file, die dan niet gaan matchen met de file die we in de formData terechtkomt
                filesAdded.push(
                    new File([blob], 'cat.jpeg', {
                        type: 'image/jpeg',
                        lastModified,
                    })
                );
            });
        });
    }
    return filesAdded;
};

const shouldRemoveAllFilesProgrammatically = (): void => {
    cy.get('vl-upload').then((element) => {
        const uploadComponent = element[0];
        uploadComponent.removeAllFiles();
    });
};
