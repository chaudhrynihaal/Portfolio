import * as si from 'react-icons/si';

const needed = [
  'SiPython', 'SiJavascript', 'SiCplusplus', 'SiCsharp', 'SiR',
  'SiN8N', 'SiZapier', 'SiTensorflow', 'SiKeras', 'SiPytorch',
  'SiReact', 'SiHtml5', 'SiCss3', 'SiStreamlit', 'SiWebflow', 'SiFramer',
  'SiPandas', 'SiPlotly', 'SiSelenium', 'SiAmazonaws', 'SiMicrosoftazure', 'SiGit', 'SiFigma'
];

for (const name of needed) {
  if (!si[name]) {
    console.log(`Missing: ${name}`);

  }
}
