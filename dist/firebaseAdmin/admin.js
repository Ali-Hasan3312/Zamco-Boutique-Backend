"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: "zamco-boutique-hotel",
        clientEmail: "firebase-adminsdk-8wpbt@zamco-boutique-hotel.iam.gserviceaccount.com",
        privateKey: ("-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/bJm0WI7RGZLA\ngd5MBaFl9fnn0fXSEzUXi7gmk8Gge8TO5ZGOoz825tvYA6MVhWGAXVsUfqOcLnFc\n7NapHO9Uh6vXiOOfn77mHjVOSqleiPcBmZkTiPqDHe0Y+Afobs2dhJMpiAdLzAmS\naqmXI0FGeZ3rzrBd9fKHlNbRumfEqRFofI8EC46ts4/PaL76VwZqlwR62gieheb9\nmq/TBMD+V1pbblETgKwgxNeQ8LR9C+ONxYZulhmd/0NdEQjXexyba8zlzAHvSNZP\nW12C+F/BkZRexpmyWFV6n7cWvubAMIoWFx3u3nXlCEF819hT9cv68/+3Fkr5A3G7\nCva5ldOHAgMBAAECggEAHtiAoht9E/uzdprWt9hWbCgpV24xVuMqdHtatrirhFE9\nYvuCK4Jpvs6PkWzwnBisn/MrKI/JjHK9aLRvWLvlYvEjwyz3RPMIX2txuoZ0aVvX\ntaXLEWdKutMZMCNTnuQv9Nh2oEQfrNqZlkLixgxzycfyJxvctp9Zr/hPb2dCrmEq\no3+MEeQQC6xdgVqg8eqki4KaNX08/fqpmHhccMBs5HV95hVpLZVoy73gKEwmxLMi\nARnhXLQo6Mah+bIRNlEbQFhH2NfIB31zR1NV+KkFil4Bvcp9m26fpp55E55bPhlQ\nB6idh2731OHqWMWuu2cLPn7dPFvxfnuBv1KQiSpS8QKBgQDjJ+5TQaoWHtTWH5Yi\nVGY2FlWo3jS1CdHnI4T3cLiRkJtGE8pZhus0WkfEVZ2gMhxpCFQBB9PamAdTgwsl\nxK9W66hyGqEQT7t15Heppp9TS49ZLY0i4Lkuv8GPZErI+0eUHVW/qbhDn1fRLPG9\nuehWCI1GwMmb8vOChUZSVa1w1wKBgQDXuya+6xEHHYUc9i4EvTjohKlcGDFYNKfK\nyNaWBOxnjM1850MFEFVEjMQUjHb3hZ0meJkuQ5u/kHIedazZ3VL57X4kI3/2Cmug\nUq6IxZ8vmfUW/iqt7uljYDC3Uw28kypiiXXKoJ+s097Uuh+XjSZHvfb6C2WxLtYH\nT1v++W5s0QKBgQCyrRAb0QTWzX2gx8uySSz00nCimdZfqM/AvgGzGKk1ZsecQaji\n7utHjNPyrV2FSqVqQLDC9sM/qGHq4KL+HE3HUyp2Rlf2mqDbxNATVAry2/ZvsRLZ\nImbHTPIVtk/U80KEUObIEdns5wOOd4nXMMp+Ec/+nVp4HoxIWEjOLrJ0lQKBgQCA\nVdJ/4wEXNYV5rC3GHfcbw8eohK/eJDzpUr7tMfKcy1N3CXCCM6w2AnOnMcSYDUFm\noHmn3wppVHm/CwwP8y0ohxLyVrgJ2zsZffZcYQwI2lLGId+r5yOqPY/djyft1bJy\nOgn7x8AVpVi7PhoLIynxpd2l9F/DnvQuFxTIQwRg8QKBgHcR16aQMpZN7HApCFYC\n21kES5KSKMS1uC79oCuCob41Df4uzb0zdNt+PP0Ml5K6hIZlgTZhVYRCM9fTwOTT\n4h2+iD0tJ0cD04A0tKS2BiuV0PPbWV3fGqBBNgsjU2C2q8DgADLTOB0xHjFNmaVY\nlBXeJL0OS/kpg6zcMvsthGx6\n-----END PRIVATE KEY-----\n").replace(/\\n/g, '\n'),
    }),
});
exports.default = admin;
