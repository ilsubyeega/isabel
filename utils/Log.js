const cli = require('cli-color');
const startMsg = function(){
    const a = cli.xterm(21)("░");
    const b = cli.xterm(20)("▒");
    const c = cli.xterm(33)("█");
    const d = cli.xterm(32)("▓");
    const e = cli.xterm(38)("▄");
    const f = cli.xterm(39)("▀");
    const g = cli.xterm(50)("ilsubyeega");
    const h = cli.xterm(45)(require('./../package.json').version);

    // isabel ascii art
    console.log(` `);
    console.log(` `);
    console.log(`       ${c}${c}${d}  ${c}${c}${c}${c}${c}${c}  ${e}${e}${e}       ${e}${e}${e}${e}   ${d}${c}${c}${c}${c}${c}  ${c}${c}${d}`);
    console.log(`      ${d}${c}${c}${b}${b}${c}${c}    ${b} ${b}${c}${c}${c}${c}${e}    ${d}${c}${c}${c}${c}${c}${e} ${d}${c}   ${f} ${d}${c}${c}${b}`);
    console.log(`      ${b}${c}${c}${b}${a} ${d}${c}${c}${e}   ${b}${c}${c}  ${f}${c}${e}  ${b}${c}${c}${b} ${e}${c}${c}${b}${c}${c}${c}   ${b}${c}${c}${a}`);
    console.log(`      ${a}${c}${c}${a}  ${b}   ${c}${c}${b}${a}${c}${c}${e}${e}${e}${e}${c}${c} ${b}${c}${c}${a}${c}${f}  ${b}${d}${c}  ${e} ${b}${c}${c}${a}`);
    console.log(`      ${a}${c}${c}${a}${b}${c}${c}${c}${c}${c}${c}${b}${b} ${d}${c}   ${d}${c}${c}${b}${a}${d}${c}  ${f}${c}${d}${a}${b}${c}${c}${c}${c}${b}${a}${c}${c}${c}${c}${c}${c}${b}`);
    console.log(`      ${a}${d}  ${b} ${b}${d}${b} ${b} ${a} ${b}${b}   ${d}${b}${c}${a}${a}${b}${d}${c}${c}${c}${f}${b}${a}${a} ${b}${a} ${a}${a} ${b}${a}${d}  ${a}`);
    console.log(`       ${b} ${a}${a} ${a}${b}  ${a} ${a}  ${b}   ${b}${b} ${a}${b}${a}${b}   ${a}  ${a} ${a}  ${a}${a} ${a} ${b}  ${a}`);
    console.log(`       ${b} ${a}${a}  ${a}  ${a}    ${a}   ${b}    ${a}    ${a}    ${a}     ${a} ${a}   `);
    console.log(`       ${a}        ${a}        ${a}  ${a} ${a}         ${a}  ${a}    ${a}  ${a}`);
    console.log(`                                   ${a}`);
    console.log(` `);
    console.log(` `);
    console.log(`      Version ${h} | Powered by ${g} `);
    console.log(`      ${cli.underline("github.com/ilsubyeega/isabel")}`);
    console.log(`      This source is licensed with ${cli.italic.xterm(245)("MIT License")}`);
    console.log(` `);
    console.log(` `);
};
const getTime = function(){
    return " " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + " ";
};

const warning = function (text) {
    console.log(cli.bgBlackBright(getTime()) + cli.bgYellow.black("  Warning ") + " " + cli.white(text));
};

const error = function(text){
    console.log(cli.bgBlackBright(getTime()) + cli.bgRed.black("   Error  ") + " " + cli.white(text));
};

const white = function(text){
    console.log(cli.bgBlackBright(getTime()) + cli.bgCyan.black("   Info   ") + " " + cli.white(text));
};

const debug = function(text){
    console.log(cli.bgBlackBright(getTime()) + cli.bgMagentaBright.black("   Debug  ") + " " + cli.white(text));
};

const getExpressPrefix = function(){
    return cli.xterm(246)(" Express ");
};
const getPrefix = function(t){
    return cli.xterm(246)(" " + t + " ");
};
module.exports = {
    warning: warning,
    error: error,
    log: white,
    debug: debug,
    getExpressPrefix: getExpressPrefix(),
    getPrefix: getPrefix,
    startMsg: startMsg
};