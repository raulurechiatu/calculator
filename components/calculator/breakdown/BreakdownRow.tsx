interface BreakdownRowProps {
    label: string;
    ron: number;
    eur: number;
    type?: 'negative' | 'bonus' | 'neutral';
}

export const BreakdownRow = ({ label, ron, eur, type = 'neutral' }: BreakdownRowProps) => {
    const colorMap = {
        negative: 'text-rose-500',
        bonus: 'text-emerald-500',
        neutral: 'text-slate-600'
    };

    return (
        <div className="flex justify-between items-center group py-0.5">
      <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors">
        {label}
      </span>
            <div className="text-right">
                <div className={`font-mono text-sm font-semibold ${colorMap[type]}`}>
                    {type === 'negative' ? '-' : type === 'bonus' ? '+' : ''} {ron.toLocaleString('ro-RO')}
                    <span className="text-[10px] ml-1">RON</span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                    {eur.toLocaleString('de-DE')} EUR
                </div>
            </div>
        </div>
    );
};