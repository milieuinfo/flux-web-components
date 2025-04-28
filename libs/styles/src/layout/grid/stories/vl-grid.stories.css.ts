import { css } from 'lit';
import {
    vlMediaScreenExtraSmall,
    vlMediaScreenMedium,
    vlMediaScreenSmall,
} from '../../../base/var/vl-media-screen.css';

export const gridStoriesResponsiveCss = css`
    .vl-grid {
        padding: 2.5vmax 1vmax 1vmax;
    }

    .vl-column {
        position: relative;
    }

    .vl-column::before {
        position: absolute;
        color: #555555;
        margin-left: 0.5rem;
        font-weight: bold;
    }

    .vl-column {
        &[class*='n--1']::before {
            content: '1';
        }

        &[class*='n--2']::before {
            content: '2';
        }

        &[class*='n--3']::before {
            content: '3';
        }

        &[class*='n--4']::before {
            content: '4';
        }

        &[class*='n--5']::before {
            content: '5';
        }

        &[class*='n--6']::before {
            content: '6';
        }

        &[class*='n--7']::before {
            content: '7';
        }

        &[class*='n--8']::before {
            content: '8';
        }

        &[class*='n--9']::before {
            content: '9';
        }

        &[class*='n--10']::before {
            content: '10';
        }

        &[class*='n--11']::before {
            content: '11';
        }

        &[class*='n--12']::before {
            content: '12';
        }

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            &[class*='m-1']::before {
                content: 'm-1';
            }

            &[class*='m-2']::before {
                content: 'm-2';
            }

            &[class*='m-3']::before {
                content: 'm-3';
            }

            &[class*='m-4']::before {
                content: 'm-4';
            }

            &[class*='m-5']::before {
                content: 'm-5';
            }

            &[class*='m-6']::before {
                content: 'm-6';
            }

            &[class*='m-7']::before {
                content: 'm-7';
            }

            &[class*='m-8']::before {
                content: 'm-8';
            }

            &[class*='m-9']::before {
                content: 'm-9';
            }

            &[class*='m-10']::before {
                content: 'm-10';
            }

            &[class*='m-11']::before {
                content: 'm-11';
            }

            &[class*='m-12']::before {
                content: 'm-12';
            }

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                &[class*='s-1']::before {
                    content: 's-1';
                }

                &[class*='s-2']::before {
                    content: 's-2';
                }

                &[class*='s-3']::before {
                    content: 's-3';
                }

                &[class*='s-4']::before {
                    content: 's-4';
                }

                &[class*='s-5']::before {
                    content: 's-5';
                }

                &[class*='s-6']::before {
                    content: 's-6';
                }

                &[class*='s-7']::before {
                    content: 's-7';
                }

                &[class*='s-8']::before {
                    content: 's-8';
                }

                &[class*='s-9']::before {
                    content: 's-9';
                }

                &[class*='s-10']::before {
                    content: 's-10';
                }

                &[class*='s-11']::before {
                    content: 's-11';
                }

                &[class*='s-12']::before {
                    content: 's-12';
                }
            }

            @media screen and (max-width: ${vlMediaScreenExtraSmall}px) {
                &[class*='xs-1']::before {
                    content: 'xs-1';
                }

                &[class*='xs-2']::before {
                    content: 'xs-2';
                }

                &[class*='xs-3']::before {
                    content: 'xs-3';
                }

                &[class*='xs-4']::before {
                    content: 'xs-4';
                }

                &[class*='xs-5']::before {
                    content: 'xs-5';
                }

                &[class*='xs-6']::before {
                    content: 'xs-6';
                }

                &[class*='xs-7']::before {
                    content: 'xs-7';
                }

                &[class*='xs-8']::before {
                    content: 'xs-8';
                }

                &[class*='xs-9']::before {
                    content: 'xs-9';
                }

                &[class*='xs-10']::before {
                    content: 'xs-10';
                }

                &[class*='xs-11']::before {
                    content: 'xs-11';
                }

                &[class*='xs-12']::before {
                    content: 'xs-12';
                }
            }
        }
    }
`;
