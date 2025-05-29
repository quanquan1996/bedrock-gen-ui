'use client'
import { Bot } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { memo } from "react"

function ChatAiMessage(props) {
    const { message } = props

    // 定义所有 Markdown 元素的样式
    const markdownStyles = {
        table: {
            borderCollapse: 'collapse',
            width: '100%',
            margin: '1.5rem 0', // 增加外边距
            border: '1px solid #ddd',
        },
        th: {
            border: '1px solid #ddd',
            padding: '10px 12px', // 增加内边距
            backgroundColor: '#f8f8f8', // 稍微调整背景色
            fontWeight: '600', // 加粗
        },
        td: {
            border: '1px solid #ddd',
            padding: '10px 12px', // 增加内边距
        },
        h1: {
            fontSize: '1.8em', // 显著增大字体
            fontWeight: '700', // 更粗
            borderBottom: '2px solid #eee', // 添加下划线
            paddingBottom: '0.3em',
            marginTop: '1.5em',
            marginBottom: '1em',
        },
        h2: {
            fontSize: '1.5em', // 增大字体
            fontWeight: '600', // 加粗
            borderBottom: '1px solid #eee', // 添加下划线
            paddingBottom: '0.3em',
            marginTop: '1.3em',
            marginBottom: '0.8em',
        },
        h3: {
            fontSize: '1.25em', // 略微增大字体
            fontWeight: '600', // 加粗
            marginTop: '1.1em',
            marginBottom: '0.6em',
        },
        h4: {
            fontSize: '1.1em',
            fontWeight: '600',
            marginTop: '1em',
            marginBottom: '0.5em',
        },
        p: { // 也可以为段落添加一些边距
            lineHeight: '1.6',
            margin: '0 0 1em 0',
        },
        ul: { // 列表样式
            margin: '0 0 1em 1.5em',
            paddingLeft: '0.5em',
        },
        ol: {
            margin: '0 0 1em 1.5em',
            paddingLeft: '0.5em',
        },
        li: {
            marginBottom: '0.4em',
        }
    }

    return (
        <div className="rounded-2xl py-4 pr-4 flex justify-center items-start gap-4 min-w-0">
            <div className="flex-shrink-0 rounded-full overflow-hidden">
                <Bot />
            </div>
            <div className="flex-1 min-w-0">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        table: ({node, ...props}) => <table style={markdownStyles.table} {...props} />,
                        th: ({node, ...props}) => <th style={markdownStyles.th} {...props} />,
                        td: ({node, ...props}) => <td style={markdownStyles.td} {...props} />,
                        h1: ({node, ...props}) => <h1 style={markdownStyles.h1} {...props} />,
                        h2: ({node, ...props}) => <h2 style={markdownStyles.h2} {...props} />,
                        h3: ({node, ...props}) => <h3 style={markdownStyles.h3} {...props} />,
                        h4: ({node, ...props}) => <h4 style={markdownStyles.h4} {...props} />,
                        p: ({node, ...props}) => <p style={markdownStyles.p} {...props} />,
                        ul: ({node, ...props}) => <ul style={markdownStyles.ul} {...props} />,
                        ol: ({node, ...props}) => <ol style={markdownStyles.ol} {...props} />,
                        li: ({node, ...props}) => <li style={markdownStyles.li} {...props} />,
                    }}
                >
                    {message.content}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default memo(ChatAiMessage)