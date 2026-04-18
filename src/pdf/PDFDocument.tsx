import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { styles, interpolateParchmentWarmth } from './styles';
import { renderNodes } from './processor';

interface PDFDocumentProps {
  title: string;
  ast: any; // The Root node from unified/remark
  parchmentWarmth: number;
}

export const PDFDocument: React.FC<PDFDocumentProps> = ({ title, ast, parchmentWarmth }) => {
  // Use the helper to process the children of the AST root
  const content = renderNodes(ast?.children || []);
  const backgroundColor = interpolateParchmentWarmth(parchmentWarmth);

  return (
    <Document title={title} author="Vestigio">
      <Page size="A4" style={[styles.page, { backgroundColor }]}>
        {/* Title Header */}
        <Text style={styles.title}>{title}</Text>

        {/* Main Body Content */}
        <View style={styles.content}>
          {content}
        </View>

        {/* Fixed Footer for Page Numbering */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Vestigio • Typeset with Intent</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) => 
              `Folio ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};