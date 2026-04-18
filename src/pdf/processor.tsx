import React from 'react';
import { Link, Text, View } from '@react-pdf/renderer';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { styles } from './styles';

interface MarkdownNode {
  type: string;
  value?: string;
  children?: MarkdownNode[];
  depth?: number;
  ordered?: boolean;
  start?: number;
  url?: string;
}

export const processMarkdown = (markdown: string): MarkdownNode => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm);
    
  // 1. Parse the string into a basic AST
  const tree = processor.parse(markdown);
  
  // 2. Run the transformers (this is what actually applies remark-gfm to the nodes!)
  const ast = processor.runSync(tree);
  
  return ast as MarkdownNode;
};

type RenderContext = {
  listDepth?: number;
  ordered?: boolean;
  start?: number;
};

const renderInlineNodes = (nodes: MarkdownNode[] = []): React.ReactNode[] => {
  return nodes.map((node, i) => renderInlineNode(node, i));
};

const renderInlineNode = (node: MarkdownNode, index: number): React.ReactNode => {
  switch (node.type) {
    case 'text':
      return node.value ?? '';

    case 'strong':
      return (
        <Text key={index} style={styles.bold}>
          {renderInlineNodes(node.children || [])}
        </Text>
      );

    case 'emphasis':
      return (
        <Text key={index} style={styles.italic}>
          {renderInlineNodes(node.children || [])}
        </Text>
      );

    case 'inlineCode':
      return (
        <Text key={index} style={styles.inlineCode}>
          {node.value}
        </Text>
      );

    case 'link':
      return node.url ? (
        <Link
          key={index}
          src={node.url}
          style={{ color: '#c5a059', textDecoration: 'underline' }}
        >
          {renderInlineNodes(node.children || [])}
        </Link>
      ) : (
        <Text key={index} style={{ color: '#c5a059', textDecoration: 'underline' }}>
          {renderInlineNodes(node.children || [])}
        </Text>
      );

    case 'break':
      return '\n';

    default:
      return null;
  }
};

export const renderNodes = (
  nodes: MarkdownNode[] = [],
  context: RenderContext = {}
): React.ReactNode[] => {
  return nodes.map((node, i) => renderNode(node, i, context));
};

const renderListChildren = (children: MarkdownNode[], context: RenderContext): React.ReactNode[] => {
  return children.map((child, i) => renderNode(child, i, context));
};

const renderListItem = (
  item: MarkdownNode,
  index: number,
  context: RenderContext,
  marker: string
): React.ReactNode => {
  return (
    <View key={index} style={styles.listItem}>
      <Text style={styles.listBullet}>{marker}</Text>

      <View style={styles.listItemContent}>
        {renderListChildren(item.children || [], {
          listDepth: (context.listDepth ?? 0) + 1,
          ordered: context.ordered,
          start: context.start,
        })}
      </View>
    </View>
  );
};

const renderNode = (
  node: MarkdownNode,
  index: number,
  context: RenderContext = {}
): React.ReactNode => {
  switch (node.type) {
    case 'root':
      return renderNodes(node.children || [], context);

    case 'heading': {
      const depth = node.depth || 1;
      const style = depth === 1 ? styles.h1 : depth === 2 ? styles.h2 : styles.h3;
      return (
        <Text key={index} style={style}>
          {renderInlineNodes(node.children || [])}
        </Text>
      );
    }

    case 'paragraph':
      return (
        <Text key={index} style={styles.paragraph}>
          {renderInlineNodes(node.children || [])}
        </Text>
      );

    case 'blockquote':
      return (
        <View key={index} style={styles.blockquote}>
          {renderNodes(node.children || [], context)}
        </View>
      );

case 'code':
  return (
    <View key={index} style={styles.codeBlock}> 
      <Text style={{ 
        fontFamily: 'Courier', // Standard PDF font, no registration needed
        fontSize: 9,
      }}>
        {node.value ?? ''}
      </Text>
    </View>
  );

    case 'list': {
      const start = node.start ?? 1;
      const depth = context.listDepth ?? 0;
      const ordered = !!node.ordered;

      return (
        <View
          key={index}
          style={[
            styles.list,
            { paddingLeft: depth > 0 ? depth * 12 : 0 },
          ]}
        >
          {(node.children || []).map((item, i) => {
            if (item.type !== 'listItem') {
              return null;
            }

            const marker = ordered ? `${start + i}.` : '•';
            return renderListItem(item, i, { listDepth: depth, ordered, start }, marker);
          })}
        </View>
      );
    }

    case 'listItem':
      return (
        <View key={index} style={styles.listItemContent}>
          {renderListChildren(node.children || [], {
            listDepth: (context.listDepth ?? 0) + 1,
            ordered: context.ordered,
            start: context.start,
          })}
        </View>
      );

    case 'table': {
  const rows = node.children || [];
  if (rows.length === 0) return null;
  
  // Calculate width once to avoid repeated division in render
  const columnCount = rows[0].children?.length || 1;
  const colWidth = `${(100 / columnCount).toFixed(2)}%`; 

  return (
    <View key={index} style={styles.table} wrap={false}>
      {rows.map((row, ri) => (
        <View key={ri} style={styles.tableRow}>
          {row.children?.map((cell, ci) => (
            <View
              key={ci}
              style={[
                ri === 0 ? styles.tableColHeader : styles.tableCol,
                { width: colWidth }, // Use the pre-calculated string
              ]}
            >
              <Text style={ri === 0 ? styles.tableCellHeader : styles.tableCell}>
                {renderInlineNodes(cell.children || [])}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

    case 'thematicBreak':
      return <View key={index} style={{ borderBottom: '1pt solid #e8e4d9', marginVertical: 10 }} />;

    default:
      return null;
  }
};