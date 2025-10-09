/**
 * YouTube  : https://youtube.com/@am_clubs
 * Telegram : https://t.me/am_clubs
 * GitHub   : https://github.com/amclubs
 * BLog     : https://amclubss.com
 */

// In the Vercel Dashboard, please use environment variables (process.env); otherwise, the default value will be an empty string.
let id = 'ec872d8f-72b0-4a04-b612-0327d85e18ed';
let uuid;
let host;

// Proxy IPs to choose from
let paddr;

// Setting the socks5 will ignore proxyIP ,Example:  user:pass@host:port  or  host:port
let s5 = '';
let socks5Enable = false;
let parsedSocks5 = {};

// Preferred addresses with optional TLS subscription
let ipLocal = [
    'wto.org:443#youtube.com/@am_clubs 数字套利(视频教程)',
    'icook.hk#t.me/am_clubs TG群(加入解锁更多节点)',
    'time.is#github.com/amclubs GitHub仓库(关注查看新功能)',
    '127.0.0.1:1234#amclubss.com 博客教程(cfnat)'
];
// Preferred address API interface
const defaultIpUrlTxt = base64Decode('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2FtY2x1YnMvYW0tY2YtdHVubmVsL21haW4vaXB2NC50eHQ=');
let randomNum = 25;
let ipUrl = [];
let ipUrlTxt = [defaultIpUrlTxt];
let ipUrlCsv = [];
let noTLS = false;
let sl = 5;

// Fake UUID and hostname for configuration generation
let fakeUserId;
let fakeHostName;

// Subscription and conversion details
let isBase64 = true;
let subConfig = base64Decode('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2FtY2x1YnMvQUNMNFNTUi9tYWluL0NsYXNoL2NvbmZpZy9BQ0w0U1NSX09ubGluZV9GdWxsX011bHRpTW9kZS5pbmk=');
let subConverter = base64Decode('dXJsLnYxLm1r');
let subProtocol = 'https';
// Subscription Setting
let tagName = base64Decode('YW1jbHVicw==');
let subUpdateTime = 6;
let timestamp = 4102329600000;
let total = 99 * 1125899906842624;
let download = Math.floor(Math.random() * 1099511627776);
let upload = download;
let expire = Math.floor(timestamp / 1000);

//nat64
let nat64 = true;
let nat64Prefix;
let nat64Prefixs = [
    '2602:fc59:b0:64::'
];

//base
const protTypeBase64 = 'ZG14bGMzTT0=';
const protTypeBase64Tro = 'ZEhKdmFtRnU=';
const httpPattern = /^http(s)?:\/\/.+/;
let network = 'ws';
let projectName = base64Decode('YW1jbHVicw==');
let fileName = '5pWw5a2X5aWX5Yip';
let ytName = base64Decode('aHR0cHM6Ly95b3V0dWJlLmNvbS9AYW1fY2x1YnM/c3ViX2NvbmZpcm1hdGlvbj0x');
let tgName = base64Decode('aHR0cHM6Ly90Lm1lL2FtX2NsdWJz');
let ghName = base64Decode('aHR0cHM6Ly9naXRodWIuY29tL2FtY2x1YnMvYW0tY2YtdHVubmVs');
let bName = base64Decode('aHR0cHM6Ly9hbWNsdWJzcy5jb20=');
let pName = '5pWw5a2X5aWX5Yip';
let hostRemark = false;
let enableLog = false;

// ========== Vercel handler ==========
export default async function handler(req, res) {
    try {
        const rawHost = getHeader(req, 'host') || getHeader(req, 'Host') || req.headers?.host || 'localhost';
        log(`[handler]-->rawHost: ${rawHost}`);
        const url = new URL(req.url, `https://${rawHost}`);
        const uaRaw = getHeader(req, 'User-Agent');
        const userAgent = typeof uaRaw === 'string' ? uaRaw : String(uaRaw ?? '');
        enableLog = url.searchParams.get('ENABLE_LOG') || process.env.ENABLE_LOG || enableLog;

        id = process.env.ID || id;
        uuid = url.searchParams.get('UUID') || process.env.UUID;
        host = url.searchParams.get('HOST') || process.env.HOST;

        const newCsvUrls = [];
        const newTxtUrls = [];
        const ip_url = url.searchParams.get('IP_URL') || process.env.IP_URL;
        if (ip_url) {
            ipUrl = await addIpText(ip_url);
            ipUrl = await getIpUrlTxtToArry(ipUrl);
            ipUrl.forEach(url => {
                if (getFileType(url) === 'csv') {
                    newCsvUrls.push(url);
                } else {
                    newTxtUrls.push(url);
                }
            });
            ipUrlCsv = [...new Set([...newCsvUrls])];
            ipUrlTxt = [...new Set([...newTxtUrls])];
        }

        const proxyIPUrl = url.searchParams.get('PROXYIP') || process.env.PROXYIP;
        if (proxyIPUrl) {
            if (httpPattern.test(proxyIPUrl)) {
                let proxyIpTxt = await addIpText(proxyIPUrl);
                let ipUrlTxtAndCsv;
                if (proxyIPUrl.endsWith('.csv')) {
                    ipUrlTxtAndCsv = await getIpUrlTxtAndCsv(noTLS, null, proxyIpTxt);
                } else {
                    ipUrlTxtAndCsv = await getIpUrlTxtAndCsv(noTLS, proxyIpTxt, null);
                }
                const uniqueIpTxt = [...new Set([...ipUrlTxtAndCsv.txt, ...ipUrlTxtAndCsv.csv])];
                paddr = uniqueIpTxt[Math.floor(Math.random() * uniqueIpTxt.length)];
            } else {
                const proxyIPs = await addIpText(proxyIPUrl);
                paddr = proxyIPs[Math.floor(Math.random() * proxyIPs.length)];
            }
        }

        s5 = url.searchParams.get('SOCKS5') || process.env.SOCKS5 || s5;
        parsedSocks5 = await parseSocks5FromUrl(s5, url);
        if (parsedSocks5) {
            socks5Enable = true;
        }

        hostRemark = url.searchParams.get('HOST_REMARK') || process.env.HOST_REMARK || hostRemark;
        let protType = url.searchParams.get('PROT_TYPE') || process.env.PROT_TYPE;
        if (protType) {
            protType = protType.toLowerCase();
        }

        nat64 = url.searchParams.get('NAT64') || process.env.NAT64 || nat64;
        const nat64PrefixUrl = url.searchParams.get('NAT64_PREFIX') || process.env.NAT64_PREFIX;
        if (nat64PrefixUrl) {
            if (httpPattern.test(nat64PrefixUrl)) {
                let proxyIpTxt = await addIpText(nat64PrefixUrl);
                let ipUrlTxtAndCsv;
                if (nat64PrefixUrl.endsWith('.csv')) {
                    ipUrlTxtAndCsv = await getIpUrlTxtAndCsv(noTLS, null, proxyIpTxt);
                } else {
                    ipUrlTxtAndCsv = await getIpUrlTxtAndCsv(noTLS, proxyIpTxt, null);
                }
                const uniqueIpTxt = [...new Set([...ipUrlTxtAndCsv.txt, ...ipUrlTxtAndCsv.csv])];
                nat64Prefix = uniqueIpTxt[Math.floor(Math.random() * uniqueIpTxt.length)];
            } else {
                nat64Prefixs = await addIpText(nat64PrefixUrl);
                nat64Prefix = nat64Prefixs[Math.floor(Math.random() * nat64Prefixs.length)];
            }
        }

        subConfig = (process.env.SUB_CONFIG || subConfig);
        subConverter = (process.env.SUB_CONVERTER || subConverter);
        const [subProtocol, subConverterWithoutProtocol] = (subConverter.startsWith("http://") || subConverter.startsWith("https://")) ? subConverter.split("://") : [undefined, subConverter];
        subConverter = subConverterWithoutProtocol;

        fakeUserId = await getFakeUserId(uuid);
        const baseFakeHost = fakeUserId.slice(6, 9) + "." + fakeUserId.slice(13, 19);
        fakeHostName = getFakeHostName(rawHost);
        log(`[handler]-->fakeUserId: ${fakeUserId}`);

        if (url.pathname === "/login") {
            return await login(req, res);
        }
        if (url.pathname === `/${id}/setting`) {
            const content = await getSettingHtml(rawHost);
            return sendResponse(content, userAgent, res);
        }
        if (url.pathname === `/${id}`) {
            const content = await getchannelConfig(rawHost, uuid, host, paddr, parsedSocks5, userAgent, url, protType, nat64, hostRemark);
            return sendResponse(content, userAgent, res);
        }
        if (url.pathname === `/${fakeUserId}`) {
            const content = await getchannelConfig(rawHost, uuid, host, paddr, parsedSocks5, 'CF-FAKE-UA', url, protType, nat64, hostRemark);
            return sendResponse(content, 'CF-FAKE-UA', res);
        }
        const content = await getSettingHtml(rawHost);
        return sendResponse(content, userAgent, res);
    } catch (err) {
        console.error('Error:', err);
        return sendResponse('Server Error: ' + err.message, 'node', res, 500);
    }
}


/** ---------------------Tools------------------------------ */
function log(...args) {
    if (enableLog) console.log(...args);
}

function error(...args) {
    if (enableLog) console.error(...args);
}

function getHeader(req, name) {
    try {
        if (!req || !req.headers) return '';
        // Edge Headers 
        if (typeof req.headers.get === 'function') {
            const v = req.headers.get(name);
            return (v === undefined || v === null) ? '' : String(v);
        }
        // Node.js headers 
        const v2 = req.headers[name.toLowerCase()];
        return (v2 === undefined || v2 === null) ? '' : String(v2);
    } catch (e) {
        console.error('getHeader error:', e);
        return '';
    }
}

function sendResponse(content, userAgent, res, status = 200) {
    const isMozilla = userAgent.toLowerCase().includes('mozilla');
    const headers = {
        "Content-Type": isMozilla ? "text/html;charset=utf-8" : "text/plain;charset=utf-8",
        "Profile-Update-Interval": `${subUpdateTime}`,
        "Subscription-Userinfo": `upload=${upload}; download=${download}; total=${total}; expire=${expire}`,
    };

    if (!isMozilla) {
        const fileNameAscii = encodeURIComponent(decodeBase64Utf8(fileName));
        headers["Content-Disposition"] = `attachment; filename=${fileNameAscii}; filename*=gbk''${fileNameAscii}`;
    }

    // ✅ 优先检测 Node.js 环境（Vercel Serverless）
    if (res && typeof res.setHeader === 'function') {
        Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
        return res.status(status).send(content);
    }

    // ✅ 否则在 Edge Runtime 中使用 Response
    if (typeof Response !== 'undefined') {
        return new Response(content, { status, headers });
    }

    return content;
}

function base64Encode(input) {
    try {
        return Buffer.from(input, 'utf-8').toString('base64');
    } catch (e) {
        if (typeof btoa === 'function') {
            const utf8 = new TextEncoder().encode(input);
            let binary = '';
            utf8.forEach(b => binary += String.fromCharCode(b));
            return btoa(binary);
        } else {
            throw new Error('Base64 encode not supported in this environment');
        }
    }
}

function base64Decode(input) {
    if (typeof atob === 'function') {
        // Edge Runtime 
        return atob(input);
    } else if (typeof Buffer === 'function') {
        // Node.js
        return Buffer.from(input, 'base64').toString('utf-8');
    } else {
        throw new Error('Base64 decode not supported in this environment');
    }
}

function doubleBase64Decode(input) {
    const first = base64Decode(input);
    return base64Decode(first);
}

function getFileType(url) {
    const baseUrl = url.split('@')[0];
    const extension = baseUrl.match(/\.(csv|txt)$/i);
    if (extension) {
        return extension[1].toLowerCase();
    } else {
        return 'txt';
    }
}

async function addIpText(envAdd) {
    var addText = envAdd.replace(/[	|"'\r\n]+/g, ',').replace(/,+/g, ',');
    //log(addText);
    if (addText.charAt(0) == ',') {
        addText = addText.slice(1);
    }
    if (addText.charAt(addText.length - 1) == ',') {
        addText = addText.slice(0, addText.length - 1);
    }
    const add = addText.split(',');
    // log(add);
    return add;
}

function socks5Parser(socks5) {
    let [latter, former] = socks5.split("@").reverse();
    let username, password, hostname, port;

    if (former) {
        const formers = former.split(":");
        if (formers.length !== 2) {
            throw new Error('Invalid SOCKS address format: authentication must be in the "username:password" format');
        }
        [username, password] = formers;
    }

    const latters = latter.split(":");
    port = Number(latters.pop());
    if (isNaN(port)) {
        throw new Error('Invalid SOCKS address format: port must be a number');
    }

    hostname = latters.join(":");
    const isIPv6 = hostname.includes(":") && !/^\[.*\]$/.test(hostname);
    if (isIPv6) {
        throw new Error('Invalid SOCKS address format: IPv6 addresses must be enclosed in brackets, e.g., [2001:db8::1]');
    }

    //log(`socks5Parser-->: username ${username} \n password: ${password} \n hostname: ${hostname} \n port: ${port}`);
    return { username, password, hostname, port };
}

async function parseSocks5FromUrl(socks5, url) {
    if (/\/socks5?=/.test(url.pathname)) {
        socks5 = url.pathname.split('5=')[1];
    } else if (/\/socks[5]?:\/\//.test(url.pathname)) {
        socks5 = url.pathname.split('://')[1].split('#')[0];
    }

    const authIdx = socks5.indexOf('@');
    if (authIdx !== -1) {
        let userPassword = socks5.substring(0, authIdx);
        const base64Regex = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i;
        if (base64Regex.test(userPassword) && !userPassword.includes(':')) {
            userPassword = atob(userPassword);
        }
        socks5 = `${userPassword}@${socks5.substring(authIdx + 1)}`;
    }

    if (socks5) {
        try {
            return socks5Parser(socks5);
        } catch (err) {
            log(err.toString());
            return null;
        }
    }
    return null;
}

function getRandomItems(arr, count) {
    if (!Array.isArray(arr)) return [];

    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

async function getFakeUserId(userId) {
    const date = new Date().toISOString().split('T')[0];
    const rawString = `${userId}-${date}`;

    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(rawString));
    const hashArray = Array.from(new Uint8Array(hashBuffer)).map(b => ('00' + b.toString(16)).slice(-2)).join('');

    return `${hashArray.substring(0, 8)}-${hashArray.substring(8, 12)}-${hashArray.substring(12, 16)}-${hashArray.substring(16, 20)}-${hashArray.substring(20, 32)}`;
}

function getFakeHostName(host) {
    if (host.includes(".pages.dev")) {
        return `${fakeHostName}.pages.dev`;
    } else if (host.includes(".workers.dev") || host.includes("notls") || noTLS === 'true') {
        return `${fakeHostName}.workers.dev`;
    }
    return `${fakeHostName}.xyz`;
}

function revertFakeInfo(content, userId, hostName) {
    //log(`revertFakeInfo-->: isBase64 ${isBase64} \n content: ${content}`);
    if (isBase64) {
        content = base64Decode(content);//Base64 decrypt
    }
    content = content.replace(new RegExp(fakeUserId, 'g'), userId).replace(new RegExp(fakeHostName, 'g'), hostName);
    if (isBase64) {
        content = base64Encode(content);//Base64 encryption
    }
    return content;
}

function decodeBase64Utf8(str) {
    const bytes = Uint8Array.from(atob(str), c => c.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
}

/** ---------------------Get data------------------------------ */
let subParams = ['sub', 'base64', 'b64', 'clash', 'singbox', 'sb'];
let portSet_http = new Set([80, 8080, 8880, 2052, 2086, 2095, 2082]);
let portSet_https = new Set([443, 8443, 2053, 2096, 2087, 2083]);
async function getchannelConfig(rawHost, userId, host, proxyIP, parsedSocks5, userAgent, _url, protType, nat64, hostRemark) {
    log(`------------getchannelConfig------------------`);
    log(`userId: ${userId} \n host: ${host} \n proxyIP: ${proxyIP} \n userAgent: ${userAgent} \n _url: ${_url} \n protType: ${protType} \n nat64: ${nat64} \n hostRemark: ${hostRemark} `);

    userAgent = userAgent.toLowerCase();
    let port = 443;
    if (host.includes('.workers.dev')) {
        port = 80;
    }

    if (userAgent.includes('mozilla') && !subParams.some(param => _url.searchParams.has(param))) {
        if (!protType) {
            protType = doubleBase64Decode(protTypeBase64);
        }
        const [v2ray, clash] = getConfigLink(userId, host, host, port, host, proxyIP, protType, nat64);
        return getHtmlResponse(rawHost, proxyIP, socks5Enable, parsedSocks5, host, v2ray, clash);
    }

    let num = randomNum || 25;
    if (protType && !randomNum) {
        num = num * 2;
    }
    
    const ipUrlTxtAndCsv = await getIpUrlTxtAndCsv(noTLS, ipUrlTxt, ipUrlCsv, num);

    log(`txt: ${ipUrlTxtAndCsv.txt} \n csv: ${ipUrlTxtAndCsv.csv}`);
    let content = await getSubscribeNode(rawHost, userAgent, _url, host, fakeHostName, fakeUserId, noTLS, ipUrlTxtAndCsv.txt, ipUrlTxtAndCsv.csv, protType, nat64, hostRemark);

    return _url.pathname === `/${fakeUserId}` ? content : revertFakeInfo(content, userId, host);
}

function getHtmlResponse(rawHost, proxyIP, socks5Enable, parsedSocks5, host, v2ray, clash) {
    const subRemark = `IP_LOCAL/IP_URL`;
    let proxyIPRemark = `PROXYIP: ${proxyIP}`;

    if (socks5Enable) {
        proxyIPRemark = `socks5: ${parsedSocks5.hostname}:${parsedSocks5.port}`;
    }

    let remark = `您的订阅节点由设置变量 ${subRemark} 提供, 当前使用反代是${proxyIPRemark}`;

    if (!proxyIP && !socks5Enable) {
        remark = `您的订阅节点由设置变量 ${subRemark} 提供, 当前没设置反代, 推荐您设置PROXYIP变量或SOCKS5变量或订阅连接带proxyIP`;
    }

    return getConfigHtml(rawHost, remark, v2ray, clash);
}

async function getIpUrlTxtAndCsv(noTLS, urlTxts, urlCsvs, num) {
    if (noTLS === 'true') {
        return {
            txt: await getIpUrlTxt(urlTxts, num),
            csv: await getIpUrlCsv(urlCsvs, 'FALSE')
        };
    }
    return {
        txt: await getIpUrlTxt(urlTxts, num),
        csv: await getIpUrlCsv(urlCsvs, 'TRUE')
    };
}

async function getIpUrlTxt(urlTxts, num) {
    if (!urlTxts || urlTxts.length === 0) {
        return [];
    }

    let ipTxt = "";
    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort();
    }, 2000);

    try {
        const urlMappings = urlTxts.map(entry => {
            const [url, suffix] = entry.split('@');
            return { url, suffix: suffix ? `@${suffix}` : '' };
        });

        const responses = await Promise.allSettled(
            urlMappings.map(({ url }) =>
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'text/html,application/xhtml+xml,application/xml;',
                        'User-Agent': projectName
                    },
                    signal: controller.signal
                }).then(response => response.ok ? response.text() : Promise.reject())
            )
        );

        for (let i = 0; i < responses.length; i++) {
            const response = responses[i];
            if (response.status === 'fulfilled') {
                const suffix = urlMappings[i].suffix;
                const content = response.value
                    .split('\n')
                    .filter(line => line.trim() !== "")
                    .map(line => line + suffix)
                    .join('\n');

                ipTxt += content + '\n';
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        clearTimeout(timeout);
    }
    // log(`getIpUrlTxt-->ipTxt: ${ipTxt} \n `);
    let newIpTxt = await addIpText(ipTxt);

    // Randomly select 50 items
    const hasAcCom = urlTxts.includes(defaultIpUrlTxt);
    if (hasAcCom || randomNum) {
        newIpTxt = getRandomItems(newIpTxt, num);
    }

    return newIpTxt;
}

async function getIpUrlTxtToArry(urlTxts) {
    if (!urlTxts || urlTxts.length === 0) {
        return [];
    }

    let ipTxt = "";
    const controller = new AbortController();

    // Set a timeout to trigger the cancellation of all requests after 2 seconds
    const timeout = setTimeout(() => {
        controller.abort();
    }, 2000);

    try {
        // Use Promise.allSettled to wait for all API requests to complete, regardless of success or failure
        // Iterate over the api array and send a fetch request to each API URL
        const responses = await Promise.allSettled(urlTxts.map(apiUrl => fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;',
                'User-Agent': projectName
            },
            signal: controller.signal // Attach the AbortController's signal to the fetch request to allow cancellation when needed
        }).then(response => response.ok ? response.text() : Promise.reject())));

        // Iterate through all the responses
        for (const response of responses) {
            // Check if the request was fulfilled successfully
            if (response.status === 'fulfilled') {
                // Get the response content
                const content = await response.value;
                ipTxt += content + '\n';
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        // Clear the timeout regardless of success or failure
        clearTimeout(timeout);
    }

    // Process the result using addIpText function
    const newIpTxt = await addIpText(ipTxt);
    // log(`ipUrlTxts: ${ipUrlTxts} \n ipTxt: ${ipTxt} \n newIpTxt: ${newIpTxt} `);

    // Return the processed result
    return newIpTxt;
}

async function getIpUrlCsv(urlCsvs, tls) {
    // Check if the CSV URLs are valid
    if (!urlCsvs || urlCsvs.length === 0) {
        return [];
    }
    const newAddressesCsv = [];

    // Fetch and process all CSVs concurrently
    const fetchCsvPromises = urlCsvs.map(async (csvUrl) => {
        // Parse the URL to get the suffix (after @)
        const [url, suffix] = csvUrl.split('@');
        const suffixText = suffix ? `@${suffix}` : '';  // If no @, suffixText will be an empty string

        try {
            const response = await fetch(url);

            // Ensure the response is successful
            if (!response.ok) {
                console.error('Error fetching CSV:', response.status, response.statusText);
                return;
            }

            // Parse the CSV content and split it into lines
            const text = await response.text();
            const lines = text.includes('\r\n') ? text.split('\r\n') : text.split('\n');

            // Ensure we have a non-empty CSV
            if (lines.length < 2) {
                console.error('CSV file is empty or has no data rows');
                return;
            }

            // Extract the header and get required field indexes
            const header = lines[0].trim().split(',');
            const tlsIndex = header.indexOf('TLS');
            const ipAddressIndex = 0; // Assuming the first column is IP address
            const portIndex = 1; // Assuming the second column is port
            const dataCenterIndex = tlsIndex + 1; // Data center assumed to be right after TLS
            const speedIndex = header.length - 1; // Last column for speed

            // If the required fields are missing, skip this CSV
            if (tlsIndex === -1) {
                console.error('CSV file missing required TLS field');
                return;
            }

            // Process the data rows
            for (let i = 1; i < lines.length; i++) {
                const columns = lines[i].trim().split(',');
                // Skip empty or malformed rows
                if (columns.length < header.length) {
                    continue;
                }
                // Check if TLS matches and speed is greater than sl
                const tlsValue = columns[tlsIndex].toUpperCase();
                const speedValue = parseFloat(columns[speedIndex]);
                if (tlsValue === tls && speedValue > sl) {
                    const ipAddress = columns[ipAddressIndex];
                    const port = columns[portIndex];
                    const dataCenter = columns[dataCenterIndex];
                    // Add suffix to the result
                    newAddressesCsv.push(`${ipAddress}:${port}#${dataCenter}${suffixText}`);
                }
            }
        } catch (error) {
            console.error('Error processing CSV URL:', csvUrl, error);
        }
    });

    // Wait for all CSVs to be processed
    await Promise.all(fetchCsvPromises);

    // log(`newAddressesCsv: ${newAddressesCsv} \n `);
    return newAddressesCsv;
}

function getConfigLink(uuid, host, address, port, remarks, proxyip, protType, nat64) {
    const encryption = 'none';
    let pathParm = `&PROT_TYPE=${protType}`;
    if (proxyip) {
        pathParm = pathParm + `&PADDR=${proxyip}`;
    }
    if (nat64) {
        pathParm = pathParm + `&P64=${nat64}`;
    }
    if (nat64Prefix) {
        pathParm = pathParm + `&P64PREFIX=${nat64Prefix}`;
    }
    if (s5) {
        pathParm = pathParm + `&S5=${s5}`;
    }
    let path = `/?ed=2560` + pathParm;
    const fingerprint = 'randomized';
    let tls = ['tls', true];
    if (host.includes('.workers.dev') || host.includes('pages.dev')) {
        path = `/${host}${path}`;
        remarks += ' 请通过绑定自定义域名订阅！';
    }

    const v2ray = getV2rayLink({ protType, host, uuid, address, port, remarks, encryption, path, fingerprint, tls });
    const clash = getClashLink(protType, host, address, port, uuid, path, tls, fingerprint);

    return [v2ray, clash];
}

function getV2rayLink({ protType, host, uuid, address, port, remarks, encryption, path, fingerprint, tls }) {
    //log(`------------getV2rayLink------------------`);
    //log(`protType: ${protType} \n host: ${host} \n uuid: ${uuid} \n address: ${address} \n port: ${port} \n remarks: ${remarks} \n encryption: ${encryption} \n path: ${path} \n fingerprint: ${fingerprint} \n tls: ${tls} `);

    let sniAndFp = `&sni=${host}&fp=${fingerprint}`;
    if (portSet_http.has(parseInt(port))) {
        tls = ['', false];
        sniAndFp = '';
    }
    const v2rayLink = `${protType}://${uuid}@${address}:${port}?encryption=${encryption}&security=${tls[0]}&type=${network}&host=${host}&path=${encodeURIComponent(path)}${sniAndFp}#${encodeURIComponent(remarks)}`;
    return v2rayLink;
}

function getClashLink(protType, host, address, port, uuid, path, tls, fingerprint) {
    //log(`------------getClashLink------------------`);
    //log(`protType: ${protType} \n host: ${host} \n address: ${address} \n port: ${port} \n uuid: ${uuid} \n path: ${path} \n tls: ${tls} \n fingerprint: ${fingerprint} `);

    return `- {type: ${protType}, name: ${host}, server: ${address}, port: ${port}, password: ${uuid}, network: ${network}, tls: ${tls[1]}, udp: false, sni: ${host}, client-fingerprint: ${fingerprint}, skip-cert-verify: true,  ws-opts: {path: ${path}, headers: {Host: ${host}}}}`;

    // 	return `
    //   - type: ${protType}
    //     name: ${host}
    //     server: ${address}
    //     port: ${port}
    //     uuid: ${uuid}
    //     network: ${network}
    //     tls: ${tls[1]}
    //     udp: false
    //     sni: ${host}
    //     client-fingerprint: ${fingerprint}
    //     ws-opts:
    //       path: "${path}"
    //       headers:
    //         host: ${host}
    // 	`;
}

function getConfigHtml(host, remark, v2ray, clash) {
    log(`------------getConfigHtml------------------`);
    log(`id: ${id} \n host: ${host} \n remark: ${remark} \n v2ray: ${v2ray} \n clash: ${clash} `);
    const title = decodeBase64Utf8(fileName);
    const fullTitle = title + '-' + projectName;

    const htmlHead = `
        <head>
        <title>${fullTitle}</title>
        <meta name='description' charset='UTF-8' content='This is a project to generate free vmess nodes. For more information, please subscribe youtube(AM科技) https://youtube.com/@am_clubs and follow GitHub https://github.com/amclubs ' />
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            color: #333;
            padding: 0;
            margin: 0;
            }
            a {
            text-decoration: none;
            }
            img {
            max-width: 100%;
            height: auto;
            }
            pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 10px;
            margin: 0;
            border-radius: 8px;
            }

            /* 按钮统一样式 */
            .link-row a, button {
            flex: 1;
            margin: 0 5px 5px 5px;
            padding: 10px 0;
            border-radius: 8px;
            text-align: center;
            font-weight: bold;
            cursor: pointer;
            border: none;
            transition: all 0.3s;
            background: linear-gradient(135deg, #5563DE, #3344cc);
            color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }

            .link-row a:hover, button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.2);
            background: linear-gradient(135deg, #3344cc, #223399);
            }

            .links { margin-top: 15px; font-size: 14px; }
            .link-row { display: flex; justify-content: space-between; margin-bottom: 10px; gap: 6px; }

            /* Dark mode */
            @media (prefers-color-scheme: dark) {
            body {
                background-color: #1e1e2f;
                color: #f0f0f0;
            }
            pre {
                background-color: #282a36;
                border-color: #6272a4;
            }
            .link-row a, button {
                background: linear-gradient(135deg, #5563DE, #3344cc);
                color: #fff;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            }
            .link-row a:hover, button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(0,0,0,0.5);
                background: linear-gradient(135deg, #3344cc, #223399);
            }
            }
        </style>
        </head>
        `;

    // Prepare header string with left alignment
    const header = `
        <div class="links">
            <div class="link-row">
                <a href="${ytName}" target="_blank">🎬 YouTube</a>
                <a href="${tgName}" target="_blank">💬 Telegram</a>
            </div>
            <div class="link-row">
                <a href="${ghName}" target="_blank">📂 GitHub</a>
                <a href="${bName}" target="_blank">🌐 Blog</a>
            </div>
            <div class="link-row">
                <a href="https://${host}/${id}/setting" rel="noopener">⚙️ 自定义设置</a>
            </div>
        </div>
  `;

    // Prepare the output string
    const httpAddr = `https://${host}/${id}`;
    const output = `
################################################################
订阅地址, 支持 Base64、clash-meta、sing-box、Quantumult X、小火箭、surge 等订阅格式, ${remark}
---------------------------------------------------------------
通用订阅地址: <button onclick='copyToClipboard("${httpAddr}?sub")'><i class="fa fa-clipboard"></i> 点击复制订阅地址 </button>
${httpAddr}?sub

Base64订阅地址: <button onclick='copyToClipboard("${httpAddr}?base64")'><i class="fa fa-clipboard"></i> 点击复制订阅地址 </button>
${httpAddr}?base64

clash订阅地址: <button onclick='copyToClipboard("${httpAddr}?clash")'><i class="fa fa-clipboard"></i> 点击复制订阅地址 </button>
${httpAddr}?clash

singbox订阅地址: <button onclick='copyToClipboard("${httpAddr}?singbox")'><i class="fa fa-clipboard"></i> 点击复制订阅地址 </button>
${httpAddr}?singbox
---------------------------------------------------------------
################################################################
v2ray
---------------------------------------------------------------
${v2ray}
---------------------------------------------------------------
################################################################
clash-meta
---------------------------------------------------------------
${clash}
---------------------------------------------------------------
################################################################
  `;

    // Final HTML
    const html = `
<html>
${htmlHead}
<body>
    ${header}
    <pre>${output}</pre>
    <script>
        function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => {
            alert("Copied to clipboard");
            })
            .catch(err => {
            console.error("Failed to copy to clipboard:", err);
            });
        }
    </script>
</body>
</html>
  `;

    return html;
}

async function getSubscribeNode(rawHost, userAgent, _url, host, fakeHostName, fakeUserId, noTLS, ipUrlTxt, ipUrlCsv, protType, nat64, hostRemark) {
    log(`------------getSubscribeNode------------------`);
    const uniqueIpTxt = [...new Set([...ipUrlTxt, ...ipUrlCsv])];
    let responseBody;
    if (!protType) {
        protType = doubleBase64Decode(protTypeBase64);
        const responseBody1 = splitNodeData(uniqueIpTxt, noTLS, fakeHostName, fakeUserId, userAgent, protType, nat64, hostRemark);
        protType = doubleBase64Decode(protTypeBase64Tro);
        const responseBody2 = splitNodeData(uniqueIpTxt, noTLS, fakeHostName, fakeUserId, userAgent, protType, nat64, hostRemark);
        responseBody = [responseBody1, responseBody2].join('\n');
    } else {
        responseBody = splitNodeData(uniqueIpTxt, noTLS, fakeHostName, fakeUserId, userAgent, doubleBase64Decode(protTypeBase64), nat64, hostRemark);
        responseBody = [responseBody].join('\n');
    }
    protType = doubleBase64Decode(protTypeBase64);
    const responseBodyTop = splitNodeData(ipLocal, noTLS, fakeHostName, fakeUserId, userAgent, protType, nat64, hostRemark);
    responseBody = [responseBodyTop, responseBody].join('\n');
    responseBody = base64Encode(responseBody);

    if (!userAgent.includes(('CF-FAKE-UA').toLowerCase())) {
        const safeHost = (rawHost || '').replace(/^https?:\/\//, '');
        let url = `https://${safeHost}/${fakeUserId}`;
        log(`[getSubscribeNode]---> url: ${url}`);

        if (isClashCondition(userAgent, _url)) {
            isBase64 = false;
            url = createSubConverterUrl('clash', url, subConfig, subConverter, subProtocol);
        } else if (isSingboxCondition(userAgent, _url)) {
            isBase64 = false;
            url = createSubConverterUrl('singbox', url, subConfig, subConverter, subProtocol);
        } else {
            return responseBody;
        }
        try {
            const finalUrl = new URL(url).toString();
            log(`[getSubscribeNode] Fetching from: ${finalUrl}`);
            const response = await fetch(finalUrl, {
                headers: {
                    'User-Agent': `${userAgent} ${projectName}`
                }
            });
            responseBody = await response.text();
        } catch (err) {
            error(`[getSubscribeNode][fetch error] ${err.message}`);
        }
    }

    return responseBody;
}

function createSubConverterUrl(target, url, subConfig, subConverter, subProtocol) {
    return `${subProtocol}://${subConverter}/sub?target=${target}&url=${encodeURIComponent(url)}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
}

function isClashCondition(userAgent, _url) {
    return (userAgent.includes('clash') && !userAgent.includes('nekobox')) || (_url.searchParams.has('clash') && !userAgent.includes('subConverter'));
}

function isSingboxCondition(userAgent, _url) {
    return userAgent.includes('sing-box') || userAgent.includes('singbox') || ((_url.searchParams.has('singbox') || _url.searchParams.has('sb')) && !userAgent.includes('subConverter'));
}

function splitNodeData(uniqueIpTxt, noTLS, host, uuid, userAgent, protType, nat64, hostRemark) {
    log(`splitNodeData----> \n host: ${host} \n uuid: ${uuid} \n protType: ${protType} \n hostRemark: ${hostRemark}`);
    const isHostRemark = (hostRemark === true || hostRemark === 'true');

    const regionMap = {
        'SG': '🇸🇬 SG',
        'HK': '🇭🇰 HK',
        'KR': '🇰🇷 KR',
        'JP': '🇯🇵 JP',
        'GB': '🇬🇧 GB',
        'US': '🇺🇸 US',
        'TW': '🇼🇸 TW',
        'CF': '📶 CF'
    };
    function isLikelyHost(str) {
        if (!str) return false;
        str = str.trim();
        if (/\s|\/|\\|\(|\)|[\u4e00-\u9fff]/.test(str)) return false;
        if (/^(\d{1,3}\.){3}\d{1,3}(:\d+)?$/.test(str)) return true;
        if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:\d+)?$/.test(str)) return true;
        return false;
    }

    const responseBody = uniqueIpTxt.map(raw => {
        const ipTxt = String(raw).trim();
        log(`splitNodeData---> ipTxt: ${ipTxt}`);
        let proxyip = "";
        let port = "443";
        let remarks = "";
        let address = "";

        const lastAt = ipTxt.lastIndexOf('@');
        let main = ipTxt;
        if (lastAt !== -1) {
            const candidate = ipTxt.slice(lastAt + 1).trim();
            if (isLikelyHost(candidate)) {
                proxyip = candidate;
                main = ipTxt.slice(0, lastAt);
                log(`splitNodeData--detected-proxy--> proxyip: ${proxyip}  main: ${main}`);
            } else {
                log(`splitNodeData--at-in-remark--> ignored candidate after @: ${candidate}`);
            }
        }

        const mainMatch = main.match(/^(\[.*\]|[^:#\s]+)(?::(\d+))?(?:#(.*))?$/);
        if (mainMatch) {
            address = mainMatch[1];
            port = mainMatch[2] || port;
            remarks = mainMatch[3] || "";
        } else {
            address = main;
            remarks = "";
        }

        if (isHostRemark) {
            remarks = host;
        } else {
            remarks = (remarks && remarks.trim()) ? remarks.trim() : address;
        }

        const rmKey = String(remarks).trim().toUpperCase();
        if (regionMap[rmKey]) {
            remarks = regionMap[rmKey];
        }

        proxyip = proxyip || paddr;
        log(`splitNodeData--final--> \n address: ${address} \n port: ${port} \n remarks: ${remarks} \n proxyip: ${proxyip}`);

        if (noTLS !== 'true' && portSet_http.has(parseInt(port))) {
            return null;
        }

        const [v2ray, clash] = getConfigLink(uuid, host, address, port, remarks, proxyip, protType, nat64);
        return v2ray;
    }).filter(Boolean).join('\n');

    return responseBody;
}


/** -------------------Home page-------------------------------- */
async function getSettingHtml(host) {
    const title = decodeBase64Utf8(fileName);
    const fullTitle = title + '-自定义设置';

    return `
<html>
<head>
  <title>${fullTitle}</title>
  <meta charset="UTF-8" />
  <style>
    :root {
      --primary: #5563DE;
      --primary-hover: #3344cc;
      --bg-light: linear-gradient(135deg, #f8faff, #eef1ff);
      --bg-dark: linear-gradient(135deg, #1e1e2f, #2a2a3f);
      --card-bg-light: #ffffff;
      --card-bg-dark: #2b2b3b;
      --text-light: #333;
      --text-dark: #f0f0f0;
      --border-light: #ddd;
      --border-dark: #444;
      --link-bg: #f0f0f0;
      --link-bg-dark: #3a3a4a;
      --link-color: #111;
    }

    body {
      font-family: "Segoe UI", Arial, sans-serif;
      margin: 0;
      padding: 0;
      min-height: 100vh;
      background: var(--bg-light);
      color: var(--text-light);
      display: flex;
      justify-content: center;
      padding: 10px 0;
      transition: background 0.5s, color 0.5s;
    }

    @media (prefers-color-scheme: dark) {
      body {
        background: var(--bg-dark);
        color: var(--text-dark);
      }
    }

    .container {
      width: 90%;
      max-width: 650px;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .navbar-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      color: var(--primary);
      font-size: 14px;
      cursor: pointer;
      transition: color 0.3s, transform 0.2s;
    }

    .back-btn:hover {
      color: var(--primary-hover);
      transform: translateX(-2px);
    }

    .navbar-right a {
      margin-left: 12px;
      text-decoration: none;
      color: var(--primary);
      font-weight: 500;
      transition: color 0.3s;
      font-size: 14px;
    }

    .navbar-right a:hover {
      color: var(--primary-hover);
    }

    form {
      background: var(--card-bg-light);
      padding: 15px 15px;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(0,0,0,0.08);
      transition: background 0.5s, box-shadow 0.3s;
    }

    @media (prefers-color-scheme: dark) {
      form {
        background: var(--card-bg-dark);
        box-shadow: 0 6px 15px rgba(0,0,0,0.25);
      }
    }

    label {
      display: block;
      margin-top: 10px;
      font-weight: 600;
      font-size: 13px;
    }

    input, select {
      width: 100%;
      padding: 6px 8px;
      margin-top: 2px;
      border: 1px solid var(--border-light);
      border-radius: 6px;
      font-size: 13px;
      box-sizing: border-box;
      transition: border-color 0.3s, background 0.3s;
    }

    input:focus, select:focus {
      outline: none;
      border-color: var(--primary);
      background: #f9faff;
    }

    @media (prefers-color-scheme: dark) {
      input, select {
        background: #3a3a4a;
        border: 1px solid var(--border-dark);
        color: var(--text-dark);
      }
      input:focus, select:focus {
        background: #46465a;
      }
    }

    .form-title {
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      color: var(--primary);
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
    }

    .form-title .icon {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      background: var(--primary);
      color: #fff;
      border-radius: 50%;
      font-size: 12px;
    }

    #generatedLink {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--link-bg);
      color: var(--link-color);
      font-size: 13px;
      padding: 4px 8px;
      border-radius: 6px;
      margin-bottom: 6px;
      word-break: break-all;
    }

    @media (prefers-color-scheme: dark) {
      #generatedLink {
        background: var(--link-bg-dark);
        color: #fff;
      }
    }

    #generatedLink button {
      background: var(--primary);
      color: #fff;
      border: none;
      padding: 2px 6px;
      font-size: 12px;
      border-radius: 4px;
      cursor: pointer;
    }

    #generatedLink button:hover {
      background: var(--primary-hover);
    }

    button.save-btn {
      width: 100%;
      background-color: var(--primary);
      color: white;
      border: none;
      padding: 10px;
      font-size: 14px;
      border-radius: 6px;
      cursor: pointer;
      transition: transform 0.2s, background-color 0.3s;
      margin-top: 4px;
    }

    button.save-btn:hover {
      background-color: var(--primary-hover);
      transform: translateY(-1px);
    }

    button.save-btn:active {
      transform: translateY(1px);
    }
    .error-msg {
      color: #e74c3c;
      font-size: 12px;
      margin-top: 2px;
      margin-bottom: 4px;
    }

  </style>
</head>
<body>
  <div class="container">
    <div class="navbar">
      <div class="navbar-left">
        <button class="back-btn" onclick="goHome()">🏠 返回主页</button>
      </div>
      <div class="navbar-right">
        <a href="https://youtube.com/@am_clubs?sub_confirmation=1" target="_blank">🎬 YouTube</a>
        <a href="https://t.me/am_clubs" target="_blank">💬 Telegram</a>
        <a href="https://github.com/am-cf-tunnel" target="_blank">📂 GitHub</a>
        <a href="https://amclubss.com" target="_blank">🌐 Blog</a>
      </div>
    </div>

    <form id="configForm">
      <h2 class="form-title"><span class="icon">⚙️</span> 自定义设置</h2>

      <div id="generatedLink" style="display:none;">
        <span id="linkText"></span>
        <button type="button" onclick="copyLink()">复制</button>
      </div>

      <label>UUID</label>
      <input type="text" id="UUID" name="HOUUIDST" placeholder="必填：UUID (例如：d0298536-d670-4045-bbb1-ddd5ea68683e)" />

      <label>HOST</label>
      <input type="text" id="HOST" name="HOST" placeholder="必填：Cloudflare节点域名 (例如：vless.amclubss.com)" />

      <label>IP_URL</label>
      <input type="text" id="IP_URL" name="IP_URL" placeholder="可选：优先IP地址 (例如：https://raw.github.../ipUrl.txt)" />

      <label>PROXYIP</label>
      <input type="text" id="PROXYIP" name="PROXYIP" placeholder="可选：反代IP或域名或地址 (例如：proxyip.amclubs.kozow.com)" />

      <label>SOCKS5</label>
      <input type="text" id="SOCKS5" name="SOCKS5" placeholder="可选：SOCKS5代理 (例如：socks5://user:pass@ip:port)" />

      <label>SUB_CONFIG</label>
      <input type="text" id="SUB_CONFIG" name="SUB_CONFIG" placeholder="可选：订阅转换配置文件 (例如：https://raw.github.../ACL4SSR_Online_Mini.ini)" />
      <label>SUB_CONVERTER</label>
      <input type="text" id="SUB_CONVERTER" name="SUB_CONVERTER" placeholder="可选：订阅转换后端api地址 (例如：url.v1.mk)" />

      <label>NAT64_PREFIX</label>
      <input type="text" id="NAT64_PREFIX" name="NAT64_PREFIX" placeholder="可选：NAT64前缀 (例如：2602:fc59:b0:64::)" />
      <label>NAT64</label>
      <select id="NAT64" name="NAT64">
        <option value="true">启用</option>
        <option value="false">关闭</option>
      </select>

      <label>PROT_TYPE</label>
      <select id="PROT_TYPE" name="PROT_TYPE">
        <option value="">默认</option>
        <option value="vless">vless</option>
        <option value="trojan">trojan</option>
      </select>

      <label>HOST_REMARK</label>
      <select id="HOST_REMARK" name="HOST_REMARK">
        <option value="false">关闭</option>
        <option value="true">启用</option>
      </select>

      <button type="button" class="save-btn" onclick="saveSettings()">💾 生成链接</button>
    </form>
  </div>

  <script>
    function goHome() {
        window.location.href = '/${id}';
    }

    function saveSettings() {
      const uuid = document.getElementById('UUID').value.trim();
      const hostInput = document.getElementById('HOST').value.trim();
      document.querySelectorAll('.error-msg').forEach(el => el.remove());
      let hasError = false;
      if (!uuid) {
        showError('UUID', '请填写 UUID');
        hasError = true;
      }
      if (!hostInput) {
        showError('HOST', '请填写 HOST');
        hasError = true;
      }
      if (hasError) return; 

      const params = new URLSearchParams();
      ['UUID','HOST','IP_URL','PROXYIP','SOCKS5','SUB_CONFIG','SUB_CONVERTER','HOST_REMARK','PROT_TYPE','NAT64','NAT64_PREFIX'].forEach(k => {
        const val = document.getElementById(k).value.trim();
        if (val) params.append(k, val);
      });

      const link = \`https://${host}/${id}?sub&\` + params.toString();
      const linkDiv = document.getElementById('generatedLink');
      const linkText = document.getElementById('linkText');
      linkText.textContent = link;
      linkDiv.style.display = 'flex';
    }

    function showError(fieldId, message) {
      const input = document.getElementById(fieldId);
      const error = document.createElement('div');
      error.className = 'error-msg';
      error.textContent = message;
      input.insertAdjacentElement('afterend', error);
    }

    function copyLink() {
      const linkText = document.getElementById('linkText').textContent;
      navigator.clipboard.writeText(linkText).then(() => {
        alert('链接已复制到剪贴板');
      });
    }
  </script>
</body>
</html>
`;
}

async function login(req, res) {
    if (req.method === "GET") {
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        res.status(200).send(renderPage({
            base64Title: pName,
            suffix: '-登录',
            heading: '🔐 请输入密码登录',
            bodyContent: `
                <form method="POST">
                    <input type="password" name="password" placeholder="输入访问密码" required />
                    <button type="submit">登录</button>
                </form>
            `,
            ytName, tgName, ghName, bName
        }));
        return;
    }

    if (req.method === "POST") {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        await new Promise(resolve => req.on('end', resolve));
        const params = new URLSearchParams(body);
        const inputPassword = params.get("password")?.trim();
        if (inputPassword === id) {
            if (!uuid || !host) {
                res.setHeader("Content-Type", "text/html; charset=UTF-8");
                res.status(400).send(renderPage({
                    base64Title: pName,
                    suffix: '-登录',
                    heading: '❌ 登录失败',
                    bodyContent: `
                        <p>⚠️ UUID 和 HOST 变量必须设置才能登录。</p>
                        <form method="POST" style="margin-top:15px;">
                            <input type="password" name="password" placeholder="密码" required />
                            <button type="submit">重新登录</button>
                        </form>
                    `,
                    ytName, tgName, ghName, bName
                }));
                return;
            }

            res.writeHead(302, { Location: `/${id}` });
            res.end();
            return;
        } else {
            res.setHeader("Content-Type", "text/html; charset=UTF-8");
            res.status(403).send(renderPage({
                base64Title: pName,
                suffix: '-登录',
                heading: '❌ 登录失败',
                bodyContent: `
                    <p>密码错误，请重新尝试。</p>
                    <form method="POST" style="margin-top:15px;">
                        <input type="password" name="password" placeholder="密码" required />
                        <button type="submit">重新登录</button>
                    </form>
                `,
                ytName, tgName, ghName, bName
            }));
            return;
        }
    }
    res.status(405).send("Method Not Allowed");
}

function renderPage({ base64Title, suffix = '', heading, bodyContent, ytName, tgName, ghName, bName }) {
    const title = decodeBase64Utf8(base64Title);
    const fullTitle = title + suffix;

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>${fullTitle}</title>
<style>
body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(135deg, #5563de, #89f7fe);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    color: #333;
}
.login-container {
    background: #fff;
    padding: 35px 30px;
    border-radius: 15px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    width: 380px;
    text-align: center;
    animation: fadeIn 0.6s ease-in-out;
}
h1 { font-size: 22px; margin-bottom: 20px; color: #444; }
input[type="password"] {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
    text-align: center;
}
button {
    margin-top: 20px;
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: none;
    background-color: #5563de;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;
}
button:hover { background-color: #3344cc; }
.links { margin-top: 20px; font-size: 14px; }
.link-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
.link-row a {
    flex: 1;
    margin: 0 5px;
    padding: 6px 0;
    color: #5563DE;
    text-decoration: none;
    text-align: center;
    border-radius: 6px;
    background: #f1f3ff;
    transition: all 0.3s;
}
.link-row a:hover { background: #e0e4ff; color: #333; }
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
@media (prefers-color-scheme: dark) {
    body {
        background: linear-gradient(135deg, #1e1e2f, #30324a);
        color: #f0f0f0;
    }
    .login-container { background: #2b2b3c; color: #eee; }
    input[type="password"] {
        background: #3a3a4d; color: #fff; border-color: #555;
    }
    button { background-color: #6b74e6; }
    .link-row a { background: #3a3a4d; color: #9db4ff; }
    .link-row a:hover { background: #4b4b6a; }
}
</style>
</head>
<body>
<div class="login-container">
<h1>${heading}</h1>
${bodyContent}
<div class="links">
    <div class="link-row">
        <a href="${ytName}" target="_blank">🎬 YouTube</a>
        <a href="${tgName}" target="_blank">💬 Telegram</a>
    </div>
    <div class="link-row">
        <a href="${ghName}" target="_blank">📂 GitHub</a>
        <a href="${bName}" target="_blank">🌐 Blog</a>
    </div>
</div>
</div>
</body>
</html>`;
}
