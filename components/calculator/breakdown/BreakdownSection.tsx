export const BreakdownSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="space-y-3">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-1">
            {title}
        </h4>
        <div className="space-y-2">
            {children}
        </div>
    </section>
);